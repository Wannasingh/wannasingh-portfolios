import { executeQuery } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface SupabaseAction {
  type: string;
  args: unknown[];
}

export async function POST(req: NextRequest) {
  try {
    const { table, actions } = (await req.json()) as { table: string; actions: SupabaseAction[] };

    let selectFields = '*';
    let isSingle = false;
    let isCountOnly = false;
    const whereClauses: string[] = [];
    const bindParams: Record<string, unknown> = {};
    const orderClauses: string[] = [];
    let limitValue: number | null = null;
    let actionType = 'SELECT'; // SELECT, INSERT, UPDATE, DELETE
    let insertData: Record<string, unknown> | null = null;
    let updateData: Record<string, unknown> | null = null;

    for (const act of actions) {
      if (act.type === 'select') {
        const [fields, opts] = act.args as [string?, { count?: string; head?: boolean }?];
        if (fields && fields !== '*') {
          selectFields = fields;
        }
        if (opts?.count === 'exact' && opts?.head === true) {
          isCountOnly = true;
        }
      } else if (act.type === 'single') {
        isSingle = true;
      } else if (act.type === 'eq') {
        const [col, val] = act.args as [string, unknown];
        const column = (table === 'stats' && col === 'number') ? 'number_val' : col;
        const paramName = `p_${column}_${Object.keys(bindParams).length}`;
        whereClauses.push(`${column} = :${paramName}`);
        bindParams[paramName] = val;
      } else if (act.type === 'order') {
        const [col, opts] = act.args as [string, { ascending?: boolean }?];
        const column = (table === 'stats' && col === 'number') ? 'number_val' : col;
        const dir = opts?.ascending === false ? 'DESC' : 'ASC';
        orderClauses.push(`${column} ${dir}`);
      } else if (act.type === 'limit') {
        limitValue = act.args[0] as number;
      } else if (act.type === 'insert') {
        actionType = 'INSERT';
        insertData = act.args[0] as Record<string, unknown>;
      } else if (act.type === 'update') {
        actionType = 'UPDATE';
        updateData = act.args[0] as Record<string, unknown>;
      } else if (act.type === 'delete') {
        actionType = 'DELETE';
      }
    }

    let sql = '';

    if (actionType === 'SELECT') {
      if (isCountOnly) {
        sql = `SELECT COUNT(*) AS COUNT FROM WANNASINGH.${table}`;
        if (whereClauses.length > 0) {
          sql += ` WHERE ${whereClauses.join(' AND ')}`;
        }
        const rows = await executeQuery<{ COUNT: number }>(sql, bindParams);
        return NextResponse.json({ count: rows[0]?.COUNT || 0, data: null, error: null });
      } else {
        sql = `SELECT ${selectFields} FROM WANNASINGH.${table}`;
        if (whereClauses.length > 0) {
          sql += ` WHERE ${whereClauses.join(' AND ')}`;
        }
        if (orderClauses.length > 0) {
          sql += ` ORDER BY ${orderClauses.join(', ')}`;
        }
        if (limitValue !== null) {
          sql += ` OFFSET 0 ROWS FETCH NEXT ${limitValue} ROWS ONLY`;
        }
        const rawRows = await executeQuery<Record<string, unknown>>(sql, bindParams);
        
        const rows = rawRows.map((r) => {
          const mapped = { ...r };
          const lowerMapped: Record<string, unknown> = {};
          for (const key of Object.keys(mapped)) {
            let val = mapped[key];
            let lowerKey = key.toLowerCase();
            if (table === 'stats' && lowerKey === 'number_val') {
              lowerKey = 'number';
            }
            if (['tech_stack', 'key_features', 'challenges'].includes(lowerKey) && typeof val === 'string') {
              try {
                val = JSON.parse(val);
              } catch {
                val = [];
              }
            }
            if (['is_featured', 'is_active', 'maintenance_mode'].includes(lowerKey)) {
              val = val === 1;
            }
            lowerMapped[lowerKey] = val;
          }
          return lowerMapped;
        });

        if (isSingle) {
          return NextResponse.json({ data: rows[0] || null, error: null });
        }
        return NextResponse.json({ data: rows, error: null });
      }
    } else if (actionType === 'INSERT' && insertData) {
      const keys = Object.keys(insertData);
      const cols = keys.map(k => (table === 'stats' && k === 'number') ? 'number_val' : k);
      const binds = keys.map((_, i) => `:${i + 1}`);
      const vals = keys.map(k => {
        const val = insertData ? insertData[k] : null;
        if (Array.isArray(val)) return JSON.stringify(val);
        if (typeof val === 'boolean') return val ? 1 : 0;
        return val;
      });

      sql = `INSERT INTO WANNASINGH.${table} (${cols.join(', ')}) VALUES (${binds.join(', ')})`;
      await executeQuery(sql, vals);
      return NextResponse.json({ data: insertData, error: null });
    } else if (actionType === 'UPDATE' && updateData) {
      const keys = Object.keys(updateData);
      const setClauses = keys.map((k, i) => {
        const col = (table === 'stats' && k === 'number') ? 'number_val' : k;
        return `${col} = :u_${i}`;
      });
      const vals = keys.map(k => {
        const val = updateData ? updateData[k] : null;
        if (Array.isArray(val)) return JSON.stringify(val);
        if (typeof val === 'boolean') return val ? 1 : 0;
        return val;
      });

      sql = `UPDATE WANNASINGH.${table} SET ${setClauses.join(', ')}`;
      if (whereClauses.length > 0) {
        sql += ` WHERE ${whereClauses.join(' AND ')}`;
      }

      const finalBinds: Record<string, unknown> = {};
      keys.forEach((k, i) => {
        finalBinds[`u_${i}`] = vals[i];
      });
      Object.assign(finalBinds, bindParams);

      await executeQuery(sql, finalBinds);
      return NextResponse.json({ data: updateData, error: null });
    } else if (actionType === 'DELETE') {
      sql = `DELETE FROM WANNASINGH.${table}`;
      if (whereClauses.length > 0) {
        sql += ` WHERE ${whereClauses.join(' AND ')}`;
      }
      await executeQuery(sql, bindParams);
      return NextResponse.json({ data: null, error: null });
    }

    return NextResponse.json({ data: null, error: new Error('Unsupported action') }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('Database query endpoint error:', msg);
    return NextResponse.json({ data: null, error: { message: msg } }, { status: 500 });
  }
}
