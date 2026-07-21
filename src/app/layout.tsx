import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import ClientLayout from "@/components/client-layout";

const courierPrime = Courier_Prime({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier-prime",
});

import { db } from '@/app/lib/api-client';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  let title = "Wannasingh Portfolio";
  let description = "Full Stack Developer & Oracle DB Architect";

  try {
    const { data: settings } = await db
      .from('system_settings')
      .select('site_title, site_description')
      .single();

    if (settings) {
      title = settings.site_title || title;
      description = settings.site_description || description;
    }
  } catch (e) {
    console.warn("Failed to fetch metadata settings at build/render time, using defaults:", e);
  }

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
      <body className={`${courierPrime.className} ${courierPrime.variable} min-h-screen bg-background text-foreground select-none`}>
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
