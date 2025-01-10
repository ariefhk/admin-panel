"use client";

import * as React from "react";
import { AudioWaveform, BookOpen, Bot, Command, GalleryVerticalEnd, Home, Settings2, SquareTerminal } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/shadcn-ui/sidebar";
import { TeamSwitcher } from "../TeamSwitcher";
import { NavMain } from "../NavMain";
import { NavUser } from "../NavUser";

interface INavItem {
  title: string;
  url: string;
}

export interface INavItems extends INavItem {
  icon?: React.ElementType;
  items: INavItem[] | [];
}

// This is sample data.
const data: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
  navMain: INavItems[];
} = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      items: [],
    },
    {
      title: "Users",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "List",
          url: "/users",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "/genesis",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
