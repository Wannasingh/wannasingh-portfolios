"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabase-admin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2, Lock, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [checkingSession, setCheckingSession] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkExistingSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            const { error } = await supabaseAdmin.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            const adminEmails = ['wannasingh.khan@gmail.com', 'sarankhtn@gmail.com'];
            if (!adminEmails.includes(email)) {
                await supabaseAdmin.auth.signOut();
                throw new Error("Unauthorized Access Detected");
            }

            router.push("/admin");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Authentication Failed";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    if (checkingSession) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden p-4">
             {/* Background Decor */}
            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 mb-4">
                        <Terminal className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">System Access</h1>
                    <p className="text-muted-foreground mt-2">Enter credentials to access the control panel</p>
                </div>

                <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border shadow-lg">
                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm mb-6 flex items-center gap-2">
                             <Lock className="h-4 w-4" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email Access</label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-background/50"
                                placeholder="admin@system.dev"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Security Key</label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-background/50"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full font-bold"
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
                            {loading ? "Authenticating..." : "Initialize Session"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            ← Return to Public Site
                        </Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
