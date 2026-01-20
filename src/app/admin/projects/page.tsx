"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabase-admin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Project, TechTag } from "../../lib/supabase";
import { uploadImage, deleteImage, isSupabaseStorageUrl } from "../../lib/storage-utils";
import Image from "next/image";

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [techTags, setTechTags] = useState<TechTag[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Project>>({});
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
        fetchProjects();
        fetchTechTags();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function checkAuth() {
        const { data: { user } } = await supabaseAdmin.auth.getUser();
        if (!user) router.push("/admin/login");
    }

    async function fetchProjects() {
        const { data, error } = await supabaseAdmin
            .from("projects")
            .select("*")
            .order("display_order", { ascending: true });

        if (!error) setProjects(data || []);
        setLoading(false);
    }

    async function fetchTechTags() {
        const { data, error } = await supabaseAdmin
            .from("tech_tags")
            .select("*")
            .eq("is_active", true)
            .order("category", { ascending: true })
            .order("display_order", { ascending: true });

        if (!error) setTechTags(data || []);
    }

    async function handleDelete(id: string) {
        if (!confirm("คุณแน่ใจหรือไม่ที่จะลบโปรเจคนี้?")) return;

        const project = projects.find((p) => p.id === id);

        // ลบรูปภาพถ้าเป็น Supabase Storage URL
        if (project?.image_url && isSupabaseStorageUrl(project.image_url)) {
            await deleteImage(project.image_url);
        }

        const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);
        if (!error) fetchProjects();
        else alert("เกิดข้อผิดพลาด: " + error.message);
    }

    async function handleSave() {
        setUploading(true);
        try {
            let imageUrl = formData.image_url;

            // อัพโหลดรูปภาพใหม่ถ้ามี
            if (imageFile) {
                imageUrl = await uploadImage(imageFile, "projects");

                // ลบรูปเก่าถ้ามี
                if (formData.image_url && isSupabaseStorageUrl(formData.image_url)) {
                    await deleteImage(formData.image_url);
                }
            }

            const dataToSave = { ...formData, tags: selectedTags, image_url: imageUrl };

            if (!editingId || editingId === "new") {
                const { error } = await supabaseAdmin.from("projects").insert([dataToSave]);
                if (error) throw error;
            } else {
                const { error } = await supabaseAdmin
                    .from("projects")
                    .update(dataToSave)
                    .eq("id", editingId);
                if (error) throw error;
            }

            setEditingId(null);
            setFormData({});
            setSelectedTags([]);
            setImageFile(null);
            setImagePreview("");
            fetchProjects();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "เกิดข้อผิดพลาด";
            alert("เกิดข้อผิดพลาด: " + errorMessage);
        } finally {
            setUploading(false);
        }
    }

    function handleEdit(project: Project) {
        setEditingId(project.id);
        setFormData(project);
        setSelectedTags(project.tags || []);
        setImagePreview(project.image_url || "");
        setImageFile(null);
    }

    function handleNew() {
        setEditingId("new");
        setSelectedTags([]);
        setFormData({
            title: "",
            description: "",
            image_url: "",
            tags: [],
            live_url: "",
            github_url: "",
            is_featured: true,
            display_order: projects.length + 1,
        });
        setImagePreview("");
        setImageFile(null);
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">กำลังโหลด...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-mono">
            <div className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">จัดการ Projects</h1>
                    <div className="flex gap-4">
                        <Button onClick={handleNew} className="bg-green-500 hover:bg-green-600 text-white">
                            + เพิ่มโปรเจคใหม่
                        </Button>
                        <Link href="/admin">
                            <Button className="bg-gray-500 hover:bg-gray-600 text-white">← กลับ</Button>
                        </Link>
                    </div>
                </div>

                {editingId && (
                    <Card className="p-6 mb-8 border-2 border-black">
                        <h2 className="text-2xl font-bold mb-4">
                            {editingId === "new" ? "เพิ่มโปรเจคใหม่" : "แก้ไขโปรเจค"}
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-bold mb-2">ชื่อโปรเจค</label>
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

                            <div>
                                <label className="block font-bold mb-2">รูปภาพ</label>

                                {/* Tab เลือกระหว่าง Upload หรือ URL */}
                                <div className="flex gap-2 mb-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImageFile(null);
                                            setImagePreview(formData.image_url || "");
                                        }}
                                        className={`px-4 py-2 rounded border-2 border-black ${!imageFile ? "bg-blue-500 text-white" : "bg-white"
                                            }`}
                                    >
                                        ใส่ URL
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({ ...formData, image_url: "" });
                                        }}
                                        className={`px-4 py-2 rounded border-2 border-black ${imageFile ? "bg-blue-500 text-white" : "bg-white"
                                            }`}
                                    >
                                        อัพโหลดไฟล์
                                    </button>
                                </div>

                                {/* แสดง input ตามที่เลือก */}
                                {!imageFile ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={formData.image_url || ""}
                                            onChange={(e) => {
                                                setFormData({ ...formData, image_url: e.target.value });
                                                setImagePreview(e.target.value);
                                                setImageFile(null);
                                            }}
                                            className="w-full px-4 py-2 border-2 border-black rounded"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        <p className="text-sm text-gray-600 mt-2">
                                            ใส่ URL รูปภาพจากภายนอก
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="w-full px-4 py-2 border-2 border-black rounded"
                                        />
                                        <p className="text-sm text-gray-600 mt-2">
                                            อัพโหลดรูปภาพไปยัง Supabase Storage
                                        </p>
                                    </div>
                                )}

                                {/* Preview รูปภาพ */}
                                {imagePreview && (
                                    <div className="mt-4 relative w-full h-48">
                                        <Image
                                            src={imagePreview}
                                            alt="Preview"
                                            fill
                                            className="object-cover rounded border-2 border-black"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block font-bold mb-2">Tags</label>

                                {/* แสดง tags ที่เลือกแล้ว */}
                                <div className="flex flex-wrap gap-2 mb-4 p-4 border-2 border-black rounded min-h-[60px]">
                                    {selectedTags.length === 0 ? (
                                        <span className="text-gray-400">เลือก tags...</span>
                                    ) : (
                                        selectedTags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-blue-100 px-3 py-1 text-sm border-2 border-black rounded-full flex items-center gap-2"
                                            >
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
                                                    className="text-red-500 hover:text-red-700 font-bold"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))
                                    )}
                                </div>

                                {/* แสดง tags ที่สามารถเลือกได้ แบ่งตาม category */}
                                <div className="space-y-4 max-h-[400px] overflow-y-auto border-2 border-black rounded p-4">
                                    {Object.entries(
                                        techTags.reduce((acc, tag) => {
                                            if (!acc[tag.category]) acc[tag.category] = [];
                                            acc[tag.category].push(tag);
                                            return acc;
                                        }, {} as Record<string, TechTag[]>)
                                    ).map(([category, tags]) => (
                                        <div key={category}>
                                            <h4 className="font-bold mb-2 text-sm text-gray-700">{category}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {tags.map((tag) => (
                                                    <button
                                                        key={tag.id}
                                                        type="button"
                                                        onClick={() => {
                                                            if (selectedTags.includes(tag.name)) {
                                                                setSelectedTags(selectedTags.filter((t) => t !== tag.name));
                                                            } else {
                                                                setSelectedTags([...selectedTags, tag.name]);
                                                            }
                                                        }}
                                                        className={`px-3 py-1 text-sm border-2 border-black rounded-full transition-colors ${selectedTags.includes(tag.name)
                                                            ? "bg-blue-500 text-white"
                                                            : "bg-white hover:bg-gray-100"
                                                            }`}
                                                    >
                                                        {tag.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-bold mb-2">Live URL</label>
                                    <input
                                        type="text"
                                        value={formData.live_url || ""}
                                        onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-black rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold mb-2">GitHub URL</label>
                                    <input
                                        type="text"
                                        value={formData.github_url || ""}
                                        onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-black rounded"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-bold mb-2">ลำดับการแสดง</label>
                                    <input
                                        type="number"
                                        value={formData.display_order || 0}
                                        onChange={(e) =>
                                            setFormData({ ...formData, display_order: parseInt(e.target.value) })
                                        }
                                        className="w-full px-4 py-2 border-2 border-black rounded"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 mt-8">
                                        <input
                                            type="checkbox"
                                            checked={formData.is_featured || false}
                                            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                            className="w-5 h-5"
                                        />
                                        <span className="font-bold">แสดงในหน้าแรก</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    onClick={handleSave}
                                    disabled={uploading}
                                    className="bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                    {uploading ? "กำลังบันทึก..." : "บันทึก"}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setEditingId(null);
                                        setFormData({});
                                        setImageFile(null);
                                        setImagePreview("");
                                    }}
                                    className="bg-gray-500 hover:bg-gray-600 text-white"
                                >
                                    ยกเลิก
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}

                <div className="grid gap-4">
                    {projects.map((project) => (
                        <Card key={project.id} className="p-6 border-2 border-black">
                            <div className="flex gap-4">
                                {project.image_url && (
                                    <div className="relative w-32 h-32 flex-shrink-0">
                                        <Image
                                            src={project.image_url}
                                            alt={project.title}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-gray-600 mb-2">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {project.tags?.map((tag, i) => (
                                            <span key={i} className="bg-blue-100 px-2 py-1 text-sm rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        ลำดับ: {project.display_order} | Featured: {project.is_featured ? "✓" : "✗"}
                                    </p>
                                </div>
                                <div className="flex gap-2 items-start">
                                    <Button
                                        onClick={() => handleEdit(project)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                                    >
                                        แก้ไข
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(project.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        ลบ
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div >
    );
}
