"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    User, 
    Briefcase, 
    Code2, 
    FolderGit2, 
    MessageSquare, 
    Settings,
    Shield,
    X,
    Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems = [
    { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { title: "Profile & Bio", href: "/admin/profile", icon: User },
    { title: "Experiences", href: "/admin/experiences", icon: Briefcase },
    { title: "Projects", href: "/admin/projects", icon: FolderGit2 },
    { title: "Skills", href: "/admin/skills", icon: Code2 },
    { title: "Availability", href: "/admin/availability", icon: MessageSquare },
];

export function AdminSidebar({ className }: { className?: string }) {
    const pathname = usePathname();

    return (
        <div className={cn("pb-12 min-h-screen w-64 border-r bg-card", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="flex items-center gap-2 mb-6 px-4">
                        <div className="bg-primary/10 p-2 rounded-lg">
                             <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">
                            Admin<span className="text-primary">Panel</span>
                        </h2>
                    </div>
                    <div className="space-y-1">
                        {sidebarItems.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <Button 
                                    variant={pathname === item.href ? "secondary" : "ghost"} 
                                    className="w-full justify-start font-medium"
                                >
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.title}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
                        Settings
                    </h2>
                    <div className="space-y-1">
                        <Link href="/admin/settings">
                            <Button variant={pathname === "/admin/settings" ? "secondary" : "ghost"} className="w-full justify-start">
                                <Settings className="mr-2 h-4 w-4" />
                                General
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Mobile Sidebar Wrapper
export function AdminMobileSidebar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
                <Menu />
            </Button>
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        />
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            className="fixed inset-y-0 left-0 z-50 w-64 bg-background border-r p-0 shadow-lg md:hidden"
                        >
                            <div className="flex justify-end p-2">
                                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <div onClick={() => setOpen(false)}>
                                <AdminSidebar />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
