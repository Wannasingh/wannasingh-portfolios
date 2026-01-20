"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabase-admin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Service } from "../../lib/supabase";

export default function AdminServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Service>>({});
    const router = useRouter();

    useEffect(() => {
        checkAuth();
        fetchServices();
    }, []);

    async function checkAuth() {
        const { data: { user } } = await supabaseAdmin.auth.getUser();
        if (!user) router.push("/admin/login");
    }

    async function fetchServices() {
        const { data, error } = await supabaseAdmin
            .from("services")
            .select("*")
            .order("display_order", { ascending: true });

        if (!error) setServices(data || []);
        setLoading(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("คุณแน่ใจหรือไม่?")) return;
        const { error } = await supabaseAdmin.from("services").delete().eq("id", id);
        if (!error) fetchServices();
        else alert("เกิดข้อผิดพลาด: " + error.message);
    }

    async function handleSave() {
        if (!editingId) {
            const { error } = await supabaseAdmin.from("services").insert([formData]);
            if (error) {
                alert("เกิดข้อผิดพลาด: " + error.message);
                return;
            }
        } else {
            const { error } = await supabaseAdmin.from("services").update(formData).eq("id", editingId);
            if (error) {
                alert("เกิดข้อผิดพลาด: " + error.message);
                return;
            }
        }
        setEditingId(null);
        setFormData({});
        fetchServices();
    }

    const iconOptions = ["FaReact", "RiNextjsFill", "IoLogoJavascript", "FaNode", "SiDotnet", "SiOracle"];

    if (loading) return <div className="min-h-screen flex items-center justify-center">กำลังโหลด...</div>;

    return (
        <div className="min-h-screen bg-gray-50 font-mono">
            <div className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">จัดการ Services</h1>
                    <div className="flex gap-4">
                        <Button
                            onClick={() => {
                                setEditingId("new");
                                setFormData({ title: "", description: "", icon_name: "FaReact", icon_color: "#61DAFB", display_order: services.length + 1, is_active: true });
                            }}
                            className="bg-green-500 hover:bg-green-600 text-white"
                        >
                            + เพิ่มบริการใหม่
                        </Button>
                        <Link href="/admin">
                            <Button className="bg-gray-500 hover:bg-gray-600 text-white">← กลับ</Button>
                        </Link>
                    </div>
                </div>

                {editingId && (
                    <Card className="p-6 mb-8 border-2 border-black">
                        <h2 className="text-2xl font-bold mb-4">{editingId === "new" ? "เพิ่มบริการใหม่" : "แก้ไขบริการ"}</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-bold mb-2">ชื่อบริการ</label>
                                <input
                                    type="text"
                                    value={formData.title || ""}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border-2 border-black rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-2">คำอธิบาย</label>
                                <textarea
                                    value={formData.description || ""}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border-2 border-black rounded"
                                    rows={3}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
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
                                <div>
                                    <label className="block font-bold mb-2">สี Icon (Hex)</label>
                                    <input
                                        type="text"
                                        value={formData.icon_color || ""}
                                        onChange={(e) => setFormData({ ...formData, icon_color: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-black rounded"
                                        placeholder="#61DAFB"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-bold mb-2">ลำดับการแสดง</label>
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
                    {services.map((service) => (
                        <Card key={service.id} className="p-6 border-2 border-black">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                    <p className="text-gray-600 mb-2">{service.description}</p>
                                    <p className="text-sm text-gray-500">
                                        Icon: {service.icon_name} | สี: {service.icon_color} | ลำดับ: {service.display_order} | Active: {service.is_active ? "✓" : "✗"}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={() => { setEditingId(service.id); setFormData(service); }} className="bg-yellow-500 hover:bg-yellow-600 text-white">แก้ไข</Button>
                                    <Button onClick={() => handleDelete(service.id)} className="bg-red-500 hover:bg-red-600 text-white">ลบ</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
