"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/navbar";
import Footer from "@/components/footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
   const pathname = usePathname();
   const isAdmin = pathname?.startsWith("/admin");

   return (
      <>
         {/* Only show Public Header if NOT admin */}
         {!isAdmin && <Header />}
         
         {/* Only add padding for fixed header if NOT admin */}
         <main className={isAdmin ? "" : "pt-16"}>
            {children}
         </main>

         {/* Only show Public Footer if NOT admin */}
         {!isAdmin && <Footer />}
      </>
   )
}
