"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabaseAdmin } from "../lib/supabase-admin";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { AdminSidebar, AdminMobileSidebar } from "@/components/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkUser();
  }, [pathname]);

  async function checkUser() {
    const { data: { user } } = await supabaseAdmin.auth.getUser();
    if (user) {
        setUser(user);
    } else {
        setUser(null);
    }
  }

  async function handleSignOut() {
    await supabaseAdmin.auth.signOut();
    router.push("/");
  }

  // Identify if we are on the login page
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
      return (
        <div className="min-h-screen bg-background">
            {children}
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex">
      {/* Desktop Sidebar (Fixed) */}
      <AdminSidebar className="hidden md:block fixed left-0 top-0 bottom-0 w-64 z-30" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64 min-h-screen">
         {/* Top Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-20 h-16 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
                <AdminMobileSidebar />
                <span className="md:hidden font-bold">AdminPanel</span>
            </div>
            
            <div className="flex items-center gap-4">
                {user && (
                    <span className="text-sm text-muted-foreground hidden md:inline-block">
                        {user.email}
                    </span>
                )}
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                </Button>
            </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {children}
        </main>
      </div>
    </div>
  );
}
