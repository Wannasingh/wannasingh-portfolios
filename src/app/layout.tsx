import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import ClientLayout from "@/components/client-layout";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

import { supabase } from "@/app/lib/supabase";

export async function generateMetadata(): Promise<Metadata> {
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.className} ${dmMono.variable} min-h-screen bg-background text-foreground select-none`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
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
