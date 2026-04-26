"use client";

import {
  User2,
  Settings,
  HelpCircle,
  LogOut,
  Package,
  Heart,
  Sparkles,
  Shield,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function UserDropdown() {
  const { user, signOut } = useAuth();

  const name = user?.full_name || user?.email?.split("@")[0] || "User";
  const email = user?.email || "";
  const avatarUrl = user?.avatar_url;
  const role = user?.role || "Member";

  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 rounded-full p-1 transition-all duration-200",
            "hover:bg-topbar-btn-bg-hover",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
        >
          <Avatar className="h-8 w-8 border-2 border-topbar-avatar-ring">
            <AvatarImage src={avatarUrl || undefined} alt={name} />
            <AvatarFallback className="bg-topbar-avatar-bg text-topbar-avatar-text text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="hidden lg:block text-left">
            <p className="text-sm font-medium leading-none text-topbar-username">
              {name.split(" ")[0]}
            </p>
            <div className="flex items-center gap-1">
              <p className="text-xs text-topbar-track">{role}</p>
              {role === "premium" && (
                <Badge className="bg-amber-500 text-white text-[10px] py-0 px-1">PRO</Badge>
              )}
            </div>
          </div>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent
        className="w-64 border-topbar-dd-border bg-topbar-dd-bg"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-topbar-username">
              {name}
            </p>
            <p className="text-xs leading-none text-topbar-track">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-topbar-dd-divider" />
        
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile" className="cursor-pointer">
              <User2 className="mr-2 h-4 w-4 text-topbar-dd-icon" />
              <span>Profile</span>
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link href="/dashboard/orders" className="cursor-pointer">
              <Package className="mr-2 h-4 w-4 text-topbar-dd-icon" />
              <span>Pesanan Saya</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link href="/wishlist" className="cursor-pointer">
              <Heart className="mr-2 h-4 w-4 text-topbar-dd-icon" />
              <span>Wishlist</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator className="bg-topbar-dd-divider" />
        
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/pricing" className="cursor-pointer">
              <Sparkles className="mr-2 h-4 w-4 text-accent" />
              <span className="text-accent">Upgrade ke Premium</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator className="bg-topbar-dd-divider" />
        
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4 text-topbar-dd-icon" />
              <span>Pengaturan</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link href="/dashboard/help" className="cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4 text-topbar-dd-icon" />
              <span>Bantuan & Support</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link href="/privacy" className="cursor-pointer">
              <Shield className="mr-2 h-4 w-4 text-topbar-dd-icon" />
              <span>Privasi & Keamanan</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator className="bg-topbar-dd-divider" />
        
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer text-topbar-dd-danger-text hover:text-topbar-dd-danger-text hover:bg-topbar-dd-danger-bg-hover"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}