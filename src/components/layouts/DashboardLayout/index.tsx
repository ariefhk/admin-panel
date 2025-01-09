import { AppSidebar } from "@/components/organism/Sidebar/AppSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Separator } from "@/components/ui/separator";
import Clock from "@/components/atoms/Clock";
import DashboardBreadCrumb, { DashboardBreadCrumbProps } from "@/components/organism/DashboardBreadcrumb";

interface DashboardLayoutProps extends DashboardBreadCrumbProps {
  children: React.ReactNode;
  date?: string;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, date, breadcrumbLinks }) => {
  const initialDate = date ? new Date(date) : undefined;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex  fixed top-0 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-15 bg-white w-full border-b-[1px]">
          <div className="flex w-[calc(100%_-_288px)]   group-has-[[data-collapsible=icon]]/sidebar-wrapper:w-[calc(100%_-_80px)]   items-center justify-between ">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <DashboardBreadCrumb breadcrumbLinks={breadcrumbLinks} />
            </div>
            <Clock initialDate={initialDate} />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 pt-[120px]  xl:max-w-7xl w-full mx-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;

export async function getServerSideProps() {
  return {
    props: {
      date: new Date().toISOString(),
    },
  };
}
