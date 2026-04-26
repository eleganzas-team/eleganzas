"use client";

import { motion } from "framer-motion";
import { 
  Calendar, 
  Edit, 
  ExternalLink, 
  Copy, 
  Trash2,
  Globe,
  Clock,
  Plus,
  Loader2,
  Eye,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { format } from "date-fns";
import { id } from "date-fns/locale";

type UserTemplate = Database["public"]["Tables"]["user_template"]["Row"] & {
  templates: Database["public"]["Tables"]["templates"]["Row"] | null;
  _count?: {
    guests: number;
  };
};

export function UserTemplateContent() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userTemplate, setUserTemplate] = useState<UserTemplate[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
  });

  useEffect(() => {
    if (!user) return;
    fetchUserTemplate();
  }, [user]);

  const fetchUserTemplate = async () => {
    if (!user) return;
    
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from("user_UserTemplate")
        .select(`
          *,
          templates:template_id (*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Get guest count for each invitation
      const UserTemplateWithCount = await Promise.all(
        (data || []).map(async (inv) => {
          const { count } = await supabase
            .from("guests")
            .select("*", { count: "exact", head: true })
            .eq("invitation_id", inv.id);
          
          return { ...inv, _count: { guests: count || 0 } };
        })
      );

      setUserTemplate(UserTemplateWithCount);
      setStats({
        total: data?.length || 0,
        published: data?.filter(i => i.is_published).length || 0,
        draft: data?.filter(i => !i.is_published).length || 0,
      });
    } catch (error) {
      console.error("Error fetching UserTemplate:", error);
      toast.error("Gagal memuat data undangan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = (subdomain: string) => {
    const link = `https://${subdomain}.eleganzas.id`;
    navigator.clipboard.writeText(link);
    toast.success("Link disalin!");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus undangan ini?")) return;
    
    const supabase = createClient();
    
    try {
      const { error } = await supabase
        .from("user_UserTemplate")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      setUserTemplate(prev => prev.filter(i => i.id !== id));
      toast.success("Undangan berhasil dihapus");
    } catch (error) {
      console.error("Error deleting invitation:", error);
      toast.error("Gagal menghapus undangan");
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    const supabase = createClient();
    
    try {
      const { error } = await supabase
        .from("user_UserTemplate")
        .update({ is_published: !currentStatus })
        .eq("id", id);
      
      if (error) throw error;
      
      setUserTemplate(prev => prev.map(i => 
        i.id === id ? { ...i, is_published: !currentStatus } : i
      ));
      
      toast.success(currentStatus ? "Undangan di-unpublish" : "Undangan dipublish");
    } catch (error) {
      console.error("Error toggling publish:", error);
      toast.error("Gagal mengubah status");
    }
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "dd MMM yyyy", { locale: id });
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-cormorant text-4xl font-bold text-page-heading">Undangan Saya</h1>
          <p className="mt-1 text-page-subtext">Kelola semua undangan digital Anda</p>
        </div>
        <Button variant="default" asChild>
          <Link href="/marketplace">
            <Plus className="mr-2 h-4 w-4" />
            Buat Undangan Baru
          </Link>
        </Button>
      </div>

      {/* Stats */}
      {userTemplate.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Undangan</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Published</p>
              <p className="text-2xl font-bold text-green-600">{stats.published}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Draft</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.draft}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* UserTemplate Grid */}
      {userTemplate.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Calendar className="h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Belum ada undangan</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Beli template dan mulai buat undangan Anda
            </p>
            <Button variant="default" className="mt-6" asChild>
              <Link href="/marketplace">Jelajahi Template</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userTemplate.map((invitation) => (
            <Card key={invitation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Preview Image */}
              <div className="relative aspect-video bg-muted">
                <img
                  src={invitation.templates?.thumbnail || "https://via.placeholder.com/400x300?text=Undangan"}
                  alt={invitation.templates?.name}
                  className="h-full w-full object-cover"
                />
                <Badge 
                  className="absolute right-3 top-3"
                  variant={invitation.is_published ? "success" : "secondary"}
                >
                  {invitation.is_published ? "Published" : "Draft"}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="line-clamp-1">{invitation.templates?.name || "Undangan"}</CardTitle>
                <p className="text-sm text-muted-foreground font-mono">
                  {invitation.subdomain}.eleganzas.id
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <span>{invitation.subdomain}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(invitation.created_at)}</span>
                  </div>
                </div>
                
                <div className="mb-4 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{invitation._count?.guests || 0} Tamu</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/dashboard/editor/${invitation.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  
                  {invitation.is_published ? (
                    <>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`https://${invitation.subdomain}.eleganzas.id`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Lihat
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/guests?invitation=${invitation.id}`}>
                          <Users className="mr-2 h-4 w-4" />
                          Tamu
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/editor/${invitation.id}?preview=true`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Link>
                    </Button>
                  )}
                  
                  <Button size="sm" variant="outline" onClick={() => handleCopyLink(invitation.subdomain)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Salin
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant={invitation.is_published ? "secondary" : "default"}
                    onClick={() => handleTogglePublish(invitation.id, invitation.is_published)}
                  >
                    {invitation.is_published ? "Unpublish" : "Publish"}
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(invitation.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
}