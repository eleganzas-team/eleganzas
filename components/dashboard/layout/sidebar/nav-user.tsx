"use client";

import { ChevronUp, User2, LogOut, Settings, HelpCircle, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export function NavUser() {
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
        <button className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-all duration-200 hover:bg-nav-bg-hover group">
          <Avatar className="h-9 w-9 rounded-lg border-2 border-sidebar-footer-border">
            <AvatarImage src={avatarUrl || undefined} alt={name} />
            <AvatarFallback className="bg-user-avatar-bg text-user-avatar-text text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-medium text-sidebar-footer-text">
                {name}
              </p>
              {role === "premium" && (
                <Badge className="bg-amber-500 text-white text-[10px] py-0 px-1">
                  PRO
                </Badge>
              )}
            </div>
            <p className="truncate text-xs text-sidebar-footer-subtext">
              {email}
            </p>
          </div>
          
          <ChevronUp className="h-4 w-4 text-sidebar-footer-icon transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" side="right" align="end" sideOffset={4}>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={avatarUrl || undefined} alt={name} />
              <AvatarFallback className="bg-user-avatar-bg text-user-avatar-text">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{name}</span>
              <span className="truncate text-xs text-muted-foreground">{email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile" className="cursor-pointer">
            <User2 className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Pengaturan</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href="/dashboard/help" className="cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Bantuan</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href="/pricing" className="cursor-pointer">
            <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
            <span className="text-amber-500">Upgrade ke Premium</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleLogout} 
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}