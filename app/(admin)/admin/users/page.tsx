"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UsersTable } from "./users-table";
import { Loader2 } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadUsers();
  }, []);
  
  const loadUsers = async () => {
    try {
      const supabase = (await import("@/lib/supabase/client")).createClient();
      const { data } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });
      
      setUsers(data || []);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage all users</p>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <UsersTable users={users} onRefresh={loadUsers} />
        </CardContent>
      </Card>
    </div>
  );
}