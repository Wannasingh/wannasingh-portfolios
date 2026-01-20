"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabase-admin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import Link from "next/link";

interface Tool {
    id: string;
    name: string;
    icon_name: string;
    display_order: number;
    is_active: boolean;
}

export default function AdminToolsPage() {
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Tool>>({});
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });
    const router = useRouter();

    const iconOptions = ["FaReact", "FaNodeJs", "SiTypescript", "SiOracle", "SiDotnet", "FaDocker", "SiMongodb", "SiPostgresql"];

    useEffect(() => {
        checkAuth();
        fetchTools();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function checkAuth() {
        const { data: { user } } = await supabaseAdmin.auth.getUser();
        if (!user) router.push("/admin/login");
    }

    async function fetchTools() {
        const { data, error } = await supabaseAdmin
            .from("tools")
            .select("*")
            .order("display_order", { ascending: true });

        if (!error) setTools(data || []);
        setLoading(false);
    }

    async function handleDelete(id: string) {
        const { error } = await supabaseAdmin.from("tools").delete().eq("id", id);
        if (!error) {
            fetchTools();
            setDeleteDialog({ open: false, id: null });
        }
    }

    async function handleSave() {
        if (!editingId || editingId === "new") {
            const { error } = await supabaseAdmin.from("tools").insert([formData]);
            if (error) return;
        } else {
            const { error } = await supabaseAdmin.from("tools").update(formData).eq("id", editingId);
            if (error) return;
        }
        setEditingId(null);
        setFormData({});
        fetchTools();
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">กำลังโหลด...</div>;

    return (
        <div className="min-h-screen bg-gray-50 font-mono">
            <div className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">จัดการ Tools</h1>
                    <div className="flex gap-4">
                        <Button
                            onClick={() => {
                                setEditingId("new");
                                setFormData({ name: "", icon_name: "FaReact", display_order: tools.length + 1, is_active: true });
                            }}
                            className="bg-green-500 hover:bg-green-600 text-white"
                        >
                            + เพิ่มใหม่
                        </Button>
                        <Link href="/admin">
                            <Button className="bg-gray-500 hover:bg-gray-600 text-white">← กลับ</Button>
                        </Link>
                    </div>
                </div>

                {editingId && (
                    <Card className="p-6 mb-8 border-2 border-black">
                        <h2 className="text-2xl font-bold mb-4">{editingId === "new" ? "เพิ่มใหม่" : "แก้ไข"}</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-bold mb-2">ชื่อ</label>
                                    <input
                                        type="text"
                                        value={formData.name || ""}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-black rounded"
                                        placeholder="React"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold mb-2">Icon</label>
                                    <select
                                        value={formData.icon_name || ""}
                                        onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-black rounded"
                                    >
                                        {iconOptions.map((icon) => (
                                            <option key={icon} value={icon}>{icon}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-bold mb-2">ลำดับ</label>
                                    <input
                                        type="number"
                                        value={formData.display_order || 0}
                                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2 border-2 border-black rounded"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 mt-8">
                                        <input
                                            type="checkbox"
                                            checked={formData.is_active || false}
                                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                            className="w-5 h-5"
                                        />
                                        <span className="font-bold">เปิดใช้งาน</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white">บันทึก</Button>
                                <Button onClick={() => { setEditingId(null); setFormData({}); }} className="bg-gray-500 hover:bg-gray-600 text-white">ยกเลิก</Button>
                            </div>
                        </div>
                    </Card>
                )}

                <div className="grid gap-4">
                    {tools.map((tool) => (
                        <Card key={tool.id} className="p-6 border-2 border-black">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        Icon: {tool.icon_name} | ลำดับ: {tool.display_order} | Active: {tool.is_active ? "✓" : "✗"}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={() => { setEditingId(tool.id); setFormData(tool); }} className="bg-yellow-500 hover:bg-yellow-600 text-white">แก้ไข</Button>
                                    <Button onClick={() => setDeleteDialog({ open: true, id: tool.id })} className="bg-red-500 hover:bg-red-600 text-white">ลบ</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, id: null })}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>ยืนยันการลบ</DialogTitle>
                        <DialogDescription>คุณแน่ใจหรือไม่ที่จะลบรายการนี้? การกระทำนี้ไม่สามารถย้อนกลับได้</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setDeleteDialog({ open: false, id: null })} className="bg-gray-500 hover:bg-gray-600 text-white">ยกเลิก</Button>
                        <Button onClick={() => deleteDialog.id && handleDelete(deleteDialog.id)} className="bg-red-500 hover:bg-red-600 text-white">ลบ</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
