"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Package,
  Calendar,
  DollarSign,
  ArrowRight,
  Sparkles,
  Eye,
  Edit,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"] & {
  templates: Database["public"]["Tables"]["templates"]["Row"] | null;
};

type UserTemplate = Database["public"]["Tables"]["user_template"]["Row"] & {
  templates: Database["public"]["Tables"]["templates"]["Row"] | null;
};

const statCards = [
  { title: "Total Pesanan", icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Undangan Aktif", icon: Calendar, color: "text-green-500", bg: "bg-green-500/10" },
  { title: "Total Belanja", icon: DollarSign, color: "text-amber-500", bg: "bg-amber-500/10" },
];

export function DashboardContent() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeUserTemplate: 0,
    totalSpent: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [userTemplate, setUserTemplate] = useState<UserTemplate[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      setIsLoading(true);
      const supabase = createClient();

      try {
        // Get total orders count
        const { count: totalOrders } = await supabase
          .from("orders")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        // Get recent orders
        const { data: recentOrdersData } = await supabase
          .from("orders")
          .select(`
            *,
            templates:template_id (*)
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5);

        // Get user invitations
        const { data: userTemplateData } = await supabase
          .from("user_template")
          .select(`
            *,
            templates:template_id (*)
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(3);

        // Calculate stats
        const activeUserTemplate = userTemplateData?.filter(i => i.is_published).length || 0;
        const totalSpent = recentOrdersData?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0;

        setStats({
          totalOrders: totalOrders || 0,
          activeUserTemplate,
          totalSpent,
        });
        setRecentOrders(recentOrdersData || []);
        setUserTemplate(userTemplateData || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;
  const userName = user?.full_name || user?.email?.split("@")[0] || "User";

  const statValues = [stats.totalOrders, stats.activeUserTemplate, stats.totalSpent];

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-cormorant text-4xl font-bold text-dash-heading">
            Selamat Datang, {userName}!
          </h1>
          <p className="mt-1 text-dash-subtext">Pantau performa undangan digital Anda</p>
        </div>
        <Button variant="default" asChild>
          <Link href="/marketplace">
            <Sparkles className="mr-2 h-4 w-4" />
            Buat Undangan Baru
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const value = statValues[index];
          return (
            <Card key={index} className="border-stat-card-border bg-stat-card-bg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-stat-card-label">{stat.title}</CardTitle>
                <div className={`rounded-lg ${stat.bg} p-2`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-stat-card-value">
                  {index === 2 ? formatPrice(value as number) : value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Active Invitations */}
      {userTemplate.length > 0 && (
        <Card className="border-stat-card-border bg-stat-card-bg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-card-foreground">Undangan Aktif</CardTitle>
              <CardDescription>Undangan yang sedang berjalan</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/invitations">
                Lihat Semua
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userTemplate.map((invitation) => (
                <div key={invitation.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">{invitation.templates?.name}</h4>
                      <Badge variant={invitation.is_published ? "success" : "secondary"}>
                        {invitation.is_published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {invitation.subdomain}.eleganzas.id
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/editor/${invitation.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={`https://${invitation.subdomain}.eleganzas.id`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Orders */}
      <Card className="border-stat-card-border bg-stat-card-bg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-card-foreground">Pesanan Terbaru</CardTitle>
            <CardDescription>5 pesanan terakhir</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/orders">
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <Package className="mx-auto h-12 w-12 opacity-50" />
              <p className="mt-2">Belum ada pesanan</p>
              <Button variant="link" asChild>
                <Link href="/marketplace">Jelajahi Template</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stat-card-icon-bg">
                      <Package className="h-5 w-5 text-stat-card-icon-color" />
                    </div>
                    <div>
                      <p className="font-medium">{order.templates?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(order.total_amount)}</p>
                    <Badge variant={order.status === "completed" ? "success" : "pending"}>
                      {order.status === "completed" ? "Selesai" : "Menunggu"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}