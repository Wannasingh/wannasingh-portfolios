"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "../lib/supabase-admin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function AdminPage() {
    const [user, setUser] = useState<{ email?: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function checkUser() {
        const { data: { user } } = await supabaseAdmin.auth.getUser();

        if (!user) {
            router.push("/admin/login");
            return;
        }

        const adminEmails = ['wannasingh.khan@gmail.com', 'sarankhtn@gmail.com'];
        if (!adminEmails.includes(user.email || '')) {
            router.push("/");
            return;
        }

        setUser(user);
        setLoading(false);
    }

    async function handleSignOut() {
        await supabaseAdmin.auth.signOut();
        router.push("/");
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>กำลังโหลด...</p>
            </div>
        );
    }

    const sections = [
        { title: "Projects", href: "/admin/projects", icon: "📁" },
        { title: "Services", href: "/admin/services", icon: "⚙️" },
        { title: "Stats", href: "/admin/stats", icon: "📊" },
        { title: "Testimonials", href: "/admin/testimonials", icon: "💬" },
        { title: "Tools", href: "/admin/tools", icon: "🔧" },
        { title: "Social Links", href: "/admin/social-links", icon: "🔗" },
        { title: "Tech Tags", href: "/admin/tech-tags", icon: "🏷️" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-mono">
            <div className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                        <p className="text-gray-600">ยินดีต้อนรับ, {user?.email}</p>
                    </div>
                    <Button
                        onClick={handleSignOut}
                        className="bg-red-500 hover:bg-red-600 text-white"
                    >
                        ออกจากระบบ
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sections.map((section) => (
                        <Link key={section.href} href={section.href}>
                            <Card className="p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300 cursor-pointer">
                                <div className="text-4xl mb-4">{section.icon}</div>
                                <h2 className="text-2xl font-bold">{section.title}</h2>
                                <p className="text-gray-600 mt-2">จัดการ {section.title}</p>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="mt-8">
                    <Link href="/">
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                            ← กลับหน้าหลัก
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
