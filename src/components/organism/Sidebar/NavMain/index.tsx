"use client";

import { ChevronRight } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import RenderList from "@/components/atoms/Renderlist";
import Link from "next/link";
import React from "react";
import { INavItems } from "../AppSidebar";
import { usePathname } from "next/navigation";

interface NavMainProps {
  items: INavItems[];
}

const NavMain: React.FC<NavMainProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <RenderList
          of={items}
          render={(item: INavItems) => {
            const hasActiveSubItem = item.items.length >= 1 ? item.items.some((t) => t.url === pathname) : item.url === pathname;

            return (
              <Collapsible key={item.title} asChild defaultOpen={hasActiveSubItem} className="group/collapsible">
                {item.items.length > 0 ? (
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <RenderList
                          of={item.items}
                          render={(subItem) => {
                            const isActive = subItem.url === pathname;
                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild isActive={isActive}>
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          }}
                        />
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={item.title} isActive={hasActiveSubItem}>
                      <Link href={item.url} className="w-full">
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </Collapsible>
            );
          }}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export { NavMain };
