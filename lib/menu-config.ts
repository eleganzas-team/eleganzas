import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  Calendar,
  HelpCircle,
  User,
  type LucideIcon,
} from "lucide-react";

export interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: MenuItem[];
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const menuConfig: MenuSection[] = [
  {
    title: "Utama",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Undangan Saya",
        url: "/dashboard/undangan",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Manajemen",
    items: [
      {
        title: "Pesanan Saya",
        url: "/dashboard/orders",
        icon: Package,
      },
      {
        title: "Data Tamu",
        url: "/dashboard/guests",
        icon: Users,
      },
    ],
  },
  {
    title: "Akun",
    items: [
      {
        title: "Profil",
        url: "/dashboard/profile",
        icon: User,
      },
      {
        title: "Pengaturan",
        url: "/dashboard/settings",
        icon: Settings,
      },
      {
        title: "Bantuan",
        url: "/dashboard/help",
        icon: HelpCircle,
      },
    ],
  },
];