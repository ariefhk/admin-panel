import RenderList from "@/components/atoms/Renderlist";
import Show from "@/components/atoms/Show";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface BreadcrumbLink {
  title: string;
  href: string;
  isActive: boolean;
}

export interface DashboardBreadCrumbProps {
  breadcrumbLinks: BreadcrumbLink[];
}

const DashboardBreadCrumb: React.FC<DashboardBreadCrumbProps> = ({ breadcrumbLinks }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <RenderList
          of={breadcrumbLinks}
          render={(item: BreadcrumbLink, index) => {
            return (
              <React.Fragment key={index + 1}>
                <BreadcrumbItem>
                  <Show when={index !== breadcrumbLinks.length - 1 && item.isActive}>
                    <BreadcrumbLink href={item.href}>{item?.title}</BreadcrumbLink>
                  </Show>
                  <Show when={index !== breadcrumbLinks.length - 1 && !item.isActive}>
                    <BreadcrumbPage>{item?.title}</BreadcrumbPage>
                  </Show>
                  <Show when={index === breadcrumbLinks.length - 1}>
                    <BreadcrumbPage>{item?.title}</BreadcrumbPage>
                  </Show>
                </BreadcrumbItem>
                <Show when={index !== breadcrumbLinks.length - 1}>
                  <BreadcrumbSeparator />
                </Show>
              </React.Fragment>
            );
          }}
        />
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadCrumb;
