import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/src/components/layout/app-shell";

export const metadata: Metadata = {
  title: "SiteDoc GUI Foundation",
  description: "Feature-based frontend migration with typed mocks.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
