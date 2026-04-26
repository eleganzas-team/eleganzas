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
  ExternalLink,
  Copy,
  Trash2,
  CheckCircle,
  XCircle
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

interface InvitationsTableProps {
  invitations: any[];
  onRefresh: () => void;
}

export function InvitationsTable({ invitations, onRefresh }: InvitationsTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleCopyLink = (subdomain: string) => {
    const link = `https://${subdomain}.eleganzas.id`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard");
  };
  
  const handleDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    const supabase = createClient();
    
    try {
      await supabase.from("user_template").delete().eq("id", deleteId);
      toast.success("Invitation deleted successfully");
      onRefresh();
      setDeleteId(null);
    } catch (error) {
      toast.error("Failed to delete invitation");
    } finally {
      setIsDeleting(false);
    }
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
            <TableHead>Subdomain</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Template</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No invitations found
              </TableCell>
            </TableRow>
          ) : (
            invitations.map((invitation) => (
              <TableRow key={invitation.id}>
                <TableCell>
                  <div>
                    <p className="font-mono text-sm">{invitation.subdomain}</p>
                    <p className="text-xs text-muted-foreground">.eleganzas.id</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{invitation.users?.full_name || "N/A"}</p>
                    <p className="text-xs text-muted-foreground">{invitation.users?.email}</p>
                  </div>
                </TableCell>
                <TableCell>{invitation.templates?.name || "N/A"}</TableCell>
                <TableCell>{invitation.views || 0}</TableCell>
                <TableCell>
                  {invitation.is_published ? (
                    <Badge className="bg-green-500">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Published
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <XCircle className="mr-1 h-3 w-3" />
                      Draft
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{formatDate(invitation.created_at)}</TableCell>
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
                        <a href={`https://${invitation.subdomain}.eleganzas.id`} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Live
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/editor/${invitation.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Open Editor
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCopyLink(invitation.subdomain)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Link
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${invitation.user_id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View User
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => setDeleteId(invitation.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Invitation</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the invitation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}