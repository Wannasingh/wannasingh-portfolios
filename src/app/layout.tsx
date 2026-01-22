import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import ClientLayout from "@/components/client-layout";

const inter = Inter({ subsets: ["latin"] });

import { supabase } from "@/app/lib/supabase";

export async function generateMetadata() {
  const { data: settings } = await supabase
    .from('system_settings')
    .select('site_title, site_description')
    .single();

  const title = settings?.site_title || "Wannasingh Portfolio";
  const description = settings?.site_description || "Full Stack Developer & Oracle DB Architect";

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    icons: [
      {
        rel: "icon",
        url: "/favicon.ico",
      },
    ],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground select-none`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <ClientLayout>
            {children}
          </ClientLayout>
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
