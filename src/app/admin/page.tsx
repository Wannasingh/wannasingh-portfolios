"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "../lib/supabase-admin";
import { Loader2 } from "lucide-react";
import { AdminStats } from "@/components/admin-stats";

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

    if (loading) {
        return (
            <div className="h-full items-center justify-center flex">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back, {user?.email}. Here is an overview of your portfolio content.
                </p>
            </div>

            <AdminStats />
        </div>
    );
}
