import { AppSidebar } from "@/components/organism/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={`${geistSans.variable} w-screen h-screen  font-[family-name:var(--font-geist-sans)]`}>{children}</main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
