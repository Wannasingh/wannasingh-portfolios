"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabase-admin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [checkingSession, setCheckingSession] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkExistingSession();
    }, []);

    async function checkExistingSession() {
        try {
            const { data: { user } } = await supabaseAdmin.auth.getUser();

            if (user) {
                const adminEmails = ['wannasingh.khan@gmail.com', 'sarankhtn@gmail.com'];
                if (adminEmails.includes(user.email || '')) {
                    router.push("/admin");
                    return;
                }
            }
        } catch (err) {
            console.error("Session check error:", err);
        } finally {
            setCheckingSession(false);
        }
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data, error } = await supabaseAdmin.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            const adminEmails = ['wannasingh.khan@gmail.com', 'sarankhtn@gmail.com'];
            if (!adminEmails.includes(email)) {
                await supabaseAdmin.auth.signOut();
                throw new Error("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
            }

            router.push("/admin");
        } catch (err: any) {
            setError(err.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
        } finally {
            setLoading(false);
        }
    }

    if (checkingSession) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-mono">กำลังตรวจสอบ...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-mono px-6">
            <Card className="w-full max-w-md p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>

                {error && (
                    <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300"
                    >
                        {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-blue-500 hover:underline">
                        ← กลับหน้าหลัก
                    </Link>
                </div>
            </Card>
        </div>
    );
}
