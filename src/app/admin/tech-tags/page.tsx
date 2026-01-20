"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabase-admin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import Link from "next/link";
import { TechTag } from "../../lib/supabase";

export default function AdminTechTagsPage() {
    const [techTags, setTechTags] = useState<TechTag[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<TechTag>>({});
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });
    const router = useRouter();

    const categories = ["Frontend", "Backend", "Database", "DevOps", "Mobile", "Testing", "Other"];
    const colors = ["blue", "green", "red", "purple", "orange", "pink", "yellow", "cyan", "gray", "teal"];

    useEffect(() => {
        checkAuth();
        fetchTechTags();
    }, []);

    async function checkAuth() {
        const { data: { user } } = await supabaseAdmin.auth.getUser();
        if (!user) router.push("/admin/login");
    }

    async function fetchTechTags() {
        const { data, error } = await supabaseAdmin
            .from("tech_tags")
            .select("*")
            .order("category", { ascending: true })
            .order("display_order", { ascending: true });

        if (!error) setTechTags(data || []);
        setLoading(false);
    }

    async function handleDelete(id: string) {
        const { error } = await supabaseAdmin.from("tech_tags").delete().eq("id", id);
        if (!error) {
            fetchTechTags();
            setDeleteDialog({ open: false, id: null });
        }
    }

    async function handleSave() {
        if (!editingId || editingId === "new") {
            const { error } = await supabaseAdmin.from("tech_tags").insert([formData]);
            if (error) return;
        } else {
            const { error } = await supabaseAdmin.from("tech_tags").update(formData).eq("id", editingId);
            if (error) return;
        }
        setEditingId(null);
        setFormData({});
        fetchTechTags();
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">กำลังโหลด...</div>;

    const groupedTags = techTags.reduce((acc, tag) => {
        if (!acc[tag.category]) acc[tag.category] = [];
        acc[tag.category].push(tag);
        return acc;
    }, {} as Record<string, TechTag[]>);

    return (
        <div className="min-h-screen bg-gray-50 font-mono">
            <div className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">จัดการ Tech Tags</h1>
                    <div className="flex gap-4">
                        <Button
                            onClick={() => {
                                setEditingId("new");
                                setFormData({ name: "", category: "Frontend", color: "blue", display_order: techTags.length + 1, is_active: true });
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
                        <h2 className="text-2xl font-bold mb-4">{editingId === "new" ? "เพิ่ม Tech Tag ใหม่" : "แก้ไข Tech Tag"}</h2>
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
                                    <label className="block font-bold mb-2">Category</label>
                                    <select
                                        value={formData.category || ""}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-black rounded"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-bold mb-2">สี</label>
                                    <select
                                        value={formData.color || ""}
                                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-black rounded"
                                    >
                                        {colors.map((color) => (
                                            <option key={color} value={color}>{color}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-bold mb-2">ลำดับ</label>
                                    <input
                                        type="number"
                                        value={formData.display_order || 0}
                                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2 border-2 border-black rounded"
                                    />
                                </div>
                            </div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.is_active || false}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="w-5 h-5"
                                />
                                <span className="font-bold">เปิดใช้งาน</span>
                            </label>
                            <div className="flex gap-4">
                                <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white">บันทึก</Button>
                                <Button onClick={() => { setEditingId(null); setFormData({}); }} className="bg-gray-500 hover:bg-gray-600 text-white">ยกเลิก</Button>
                            </div>
                        </div>
                    </Card>
                )}

                <div className="space-y-6">
                    {Object.entries(groupedTags).map(([category, tags]) => (
                        <div key={category}>
                            <h2 className="text-2xl font-bold mb-4">{category}</h2>
                            <div className="grid gap-4">
                                {tags.map((tag) => (
                                    <Card key={tag.id} className="p-4 border-2 border-black">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-lg font-bold">{tag.name}</h3>
                                                <p className="text-sm text-gray-500">
                                                    สี: {tag.color} | ลำดับ: {tag.display_order} | Active: {tag.is_active ? "✓" : "✗"}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button onClick={() => { setEditingId(tag.id); setFormData(tag); }} className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1">แก้ไข</Button>
                                                <Button onClick={() => setDeleteDialog({ open: true, id: tag.id })} className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1">ลบ</Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, id: null })}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>ยืนยันการลบ</DialogTitle>
                        <DialogDescription>คุณแน่ใจหรือไม่ที่จะลบ tag นี้? การกระทำนี้ไม่สามารถย้อนกลับได้</DialogDescription>
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
