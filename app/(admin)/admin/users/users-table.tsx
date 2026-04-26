"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Eye, 
  Ban, 
  CheckCircle,
  Mail,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UsersTableProps {
  users: any[];
  onRefresh: () => void;
}

const roleBadgeColors: Record<string, string> = {
  admin: "bg-red-500",
  user: "bg-blue-500",
  premium: "bg-amber-500",
};

export function UsersTable({ users, onRefresh }: UsersTableProps) {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleToggleActive = async (id: string, currentActive: boolean) => {
    const supabase = createClient();
    
    try {
      await supabase
        .from("users")
        .update({ is_active: !currentActive })
        .eq("id", id);
      
      toast.success(`User ${!currentActive ? "activated" : "deactivated"}`);
      onRefresh();
    } catch (error) {
      toast.error("Failed to update user");
    }
  };
  
  const handleBanUser = async () => {
    if (!selectedUser) return;
    
    setIsLoading(true);
    const supabase = createClient();
    
    try {
      await supabase
        .from("users")
        .update({ is_banned: true, banned_at: new Date().toISOString() })
        .eq("id", selectedUser.id);
      
      toast.success(`User ${selectedUser.full_name || selectedUser.email} has been banned`);
      onRefresh();
      setShowBanDialog(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error("Failed to ban user");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUnbanUser = async (id: string) => {
    const supabase = createClient();
    
    try {
      await supabase
        .from("users")
        .update({ is_banned: false, banned_at: null })
        .eq("id", id);
      
      toast.success("User has been unbanned");
      onRefresh();
    } catch (error) {
      toast.error("Failed to unban user");
    }
  };
  
  const handleChangeRole = async (id: string, role: string) => {
    const supabase = createClient();
    
    try {
      await supabase
        .from("users")
        .update({ role })
        .eq("id", id);
      
      toast.success(`User role changed to ${role}`);
      onRefresh();
      setShowRoleDialog(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error("Failed to change role");
    }
  };
  
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar_url} alt={user.full_name} />
                      <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.full_name || "N/A"}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={roleBadgeColors[user.role] || "bg-gray-500"}>
                    {user.role || "user"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="link" size="sm" asChild>
                    <Link href={`/admin/orders?userId=${user.id}`}>
                      View Orders
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>{formatDate(user.created_at)}</TableCell>
                <TableCell>
                  {user.is_banned ? (
                    <Badge variant="destructive">Banned</Badge>
                  ) : (
                    <Switch
                      checked={user.is_active !== false}
                      onCheckedChange={() => handleToggleActive(user.id, user.is_active !== false)}
                    />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${user.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href={`mailto:${user.email}`}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => {
                        setSelectedUser(user);
                        setShowRoleDialog(true);
                      }}>
                        <Shield className="mr-2 h-4 w-4" />
                        Change Role
                      </DropdownMenuItem>
                      {user.is_banned ? (
                        <DropdownMenuItem onClick={() => handleUnbanUser(user.id)}>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          Unban User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedUser(user);
                            setShowBanDialog(true);
                          }}
                          className="text-destructive"
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Ban User
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {/* Ban User Dialog */}
      <AlertDialog open={showBanDialog} onOpenChange={setShowBanDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ban User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to ban <strong>{selectedUser?.full_name || selectedUser?.email}</strong>?
              They will not be able to access their account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleBanUser}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? "Banning..." : "Ban User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Change Role Dialog */}
      <AlertDialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change User Role</AlertDialogTitle>
            <AlertDialogDescription>
              Select a new role for <strong>{selectedUser?.full_name || selectedUser?.email}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            {["user", "premium", "admin"].map((role) => (
              <Button
                key={role}
                variant={selectedUser?.role === role ? "default" : "outline"}
                className="justify-start capitalize"
                onClick={() => handleChangeRole(selectedUser?.id, role)}
              >
                <Shield className="mr-2 h-4 w-4" />
                {role}
              </Button>
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}