"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabase-admin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import Link from "next/link";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    quote: string;
    display_order: number;
    is_active: boolean;
}

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Testimonial>>({});
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });
    const router = useRouter();

    useEffect(() => {
        checkAuth();
        fetchTestimonials();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function checkAuth() {
        const { data: { user } } = await supabaseAdmin.auth.getUser();
        if (!user) router.push("/admin/login");
    }

    async function fetchTestimonials() {
        const { data, error } = await supabaseAdmin
            .from("testimonials")
            .select("*")
            .order("display_order", { ascending: true });

        if (!error) setTestimonials(data || []);
        setLoading(false);
    }

    async function handleDelete(id: string) {
        const { error } = await supabaseAdmin.from("testimonials").delete().eq("id", id);
        if (!error) {
            fetchTestimonials();
            setDeleteDialog({ open: false, id: null });
        }
    }

    async function handleSave() {
        if (!editingId || editingId === "new") {
            const { error } = await supabaseAdmin.from("testimonials").insert([formData]);
            if (error) return;
        } else {
            const { error } = await supabaseAdmin.from("testimonials").update(formData).eq("id", editingId);
            if (error) return;
        }
        setEditingId(null);
        setFormData({});
        fetchTestimonials();
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">กำลังโหลด...</div>;

    return (
        <div className="min-h-screen bg-gray-50 font-mono">
            <div className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">จัดการ Testimonials</h1>
                    <div className="flex gap-4">
                        <Button
                            onClick={() => {
                                setEditingId("new");
                                setFormData({ name: "", role: "", quote: "", display_order: testimonials.length + 1, is_active: true });
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
                            <div>
                                <label className="block font-bold mb-2">ชื่อโปรเจค</label>
                                <input
                                    type="text"
                                    value={formData.name || ""}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border-2 border-black rounded"
                                    placeholder="E-commerce Platform"
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-2">เทคโนโลยี</label>
                                <input
                                    type="text"
                                    value={formData.role || ""}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-4 py-2 border-2 border-black rounded"
                                    placeholder="React, Node.js, MongoDB"
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-2">คำอธิบาย</label>
                                <textarea
                                    value={formData.quote || ""}
                                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                    className="w-full px-4 py-2 border-2 border-black rounded"
                                    rows={4}
                                    placeholder="Built a responsive e-commerce site..."
                                />
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
                    {testimonials.map((item) => (
                        <Card key={item.id} className="p-6 border-2 border-black">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                    <p className="text-sm text-blue-500 mb-2">{item.role}</p>
                                    <p className="text-gray-600 mb-2">{item.quote}</p>
                                    <p className="text-sm text-gray-500">
                                        ลำดับ: {item.display_order} | Active: {item.is_active ? "✓" : "✗"}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={() => { setEditingId(item.id); setFormData(item); }} className="bg-yellow-500 hover:bg-yellow-600 text-white">แก้ไข</Button>
                                    <Button onClick={() => setDeleteDialog({ open: true, id: item.id })} className="bg-red-500 hover:bg-red-600 text-white">ลบ</Button>
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
