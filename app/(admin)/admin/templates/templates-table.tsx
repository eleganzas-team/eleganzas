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
  Edit, 
  Trash2, 
  Eye, 
  Copy,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { templateService } from "@/services/template.service";
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

interface TemplatesTableProps {
  templates: any[];
  onRefresh: () => void;
}

const tierBadgeColors: Record<string, string> = {
  standard: "bg-blue-500",
  premium: "bg-amber-500",
  exclusive: "bg-purple-500",
};

export function TemplatesTable({ templates, onRefresh }: TemplatesTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      // Update via service
      const supabase = (await import("@/lib/supabase/client")).createClient();
      await supabase
        .from("templates")
        .update({ is_active: !currentActive })
        .eq("id", id);
      
      toast.success(`Template ${!currentActive ? "activated" : "deactivated"}`);
      onRefresh();
    } catch (error) {
      toast.error("Failed to update template");
    }
  };
  
  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const supabase = (await import("@/lib/supabase/client")).createClient();
      await supabase
        .from("templates")
        .update({ is_featured: !currentFeatured })
        .eq("id", id);
      
      toast.success(`Template ${!currentFeatured ? "featured" : "unfeatured"}`);
      onRefresh();
    } catch (error) {
      toast.error("Failed to update template");
    }
  };
  
  const handleDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    
    try {
      await templateService.delete(deleteId);
      toast.success("Template deleted successfully");
      onRefresh();
      setDeleteId(null);
    } catch (error) {
      toast.error("Failed to delete template");
    } finally {
      setIsDeleting(false);
    }
  };
  
  const handleDuplicate = async (template: any) => {
    try {
      const supabase = (await import("@/lib/supabase/client")).createClient();
      const { id, created_at, updated_at, ...templateData } = template;
      
      await supabase.from("templates").insert({
        ...templateData,
        name: `${template.name} (Copy)`,
        sales: 0,
        is_active: false,
      });
      
      toast.success("Template duplicated successfully");
      onRefresh();
    } catch (error) {
      toast.error("Failed to duplicate template");
    }
  };
  
  const formatPrice = (price: number) => `Rp ${price.toLocaleString("id-ID")}`;
  
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Template</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Sales</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Theme</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No templates found
              </TableCell>
            </TableRow>
          ) : (
            templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={template.thumbnail || template.gallery?.[0] || "https://via.placeholder.com/40"}
                      alt={template.name}
                      className="h-10 w-10 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-xs text-muted-foreground">{template.category}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p>{template.type_template}</p>
                  </div>
                  {/* <Badge className={tierBadgeColors[template.tier] || "bg-gray-500"}>
                    {template.tier}
                  </Badge> */}
                </TableCell>
                <TableCell>{formatPrice(template.price)}</TableCell>
                <TableCell>{template.sales || 0}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span>{template.rating || 0}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {/* <Switch
                    checked={template.is_active}
                    onCheckedChange={() => handleToggleActive(template.id, template.is_active)}
                  /> */}
                  
                  <div>
                    <p>{template.category}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {/* <Switch
                    checked={template.is_featured}
                    onCheckedChange={() => handleToggleFeatured(template.id, template.is_featured)}
                  /> */}
                  
                  <div>
                    <p>{template.theme}</p>
                  </div>
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
                        <Link href={`/admin/templates/${template.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/templates/${template.id}/config`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Config
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/templates/${template.id}`} target="_blank">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(template)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => setDeleteId(template.id)}
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
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the template.
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