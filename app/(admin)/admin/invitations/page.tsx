"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { InvitationsTable } from "./invitations-table";
import { Loader2 } from "lucide-react";

export default function AdminInvitationsPage() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadInvitations();
  }, []);
  
  const loadInvitations = async () => {
    try {
      const supabase = (await import("@/lib/supabase/client")).createClient();
      const { data } = await supabase
        .from("user_invitations")
        .select(`
          *,
          templates:template_id (name),
          users:user_id (full_name, email)
        `)
        .order("created_at", { ascending: false });
      
      setInvitations(data || []);
    } catch (error) {
      console.error("Error loading invitations:", error);
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
        <h1 className="font-heading text-3xl font-bold">Invitations</h1>
        <p className="text-muted-foreground">Manage all user invitations</p>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <InvitationsTable invitations={invitations} onRefresh={loadInvitations} />
        </CardContent>
      </Card>
    </div>
  );
}