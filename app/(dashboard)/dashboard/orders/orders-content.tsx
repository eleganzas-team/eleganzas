"use client";

import { motion } from "framer-motion";
import { Package, Eye, Download, Loader2, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "sonner";

type Order = Database["public"]["Tables"]["orders"]["Row"] & {
  templates: Database["public"]["Tables"]["templates"]["Row"] | null;
};

const statusConfig: Record<string, { label: string; variant: "success" | "pending" | "warning" | "destructive" | "secondary" }> = {
  completed: { label: "Selesai", variant: "success" },
  pending: { label: "Menunggu Pembayaran", variant: "pending" },
  processing: { label: "Diproses", variant: "warning" },
  cancelled: { label: "Dibatalkan", variant: "destructive" },
  paid: { label: "Dibayar", variant: "secondary" },
};

export function OrdersContent() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stats, setStats] = useState({
    total: 0,
    totalSpent: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    if (!user) return;
    fetchOrders();
  }, [user]);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    if (!user) return;
    
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          templates:template_id (*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const ordersData = data || [];
      setOrders(ordersData);
      setFilteredOrders(ordersData);

      // Calculate stats
      const totalSpent = ordersData.reduce((sum, o) => sum + (o.total_amount || 0), 0);
      setStats({
        total: ordersData.length,
        totalSpent,
        completed: ordersData.filter(o => o.status === "completed").length,
        pending: ordersData.filter(o => o.status === "pending").length,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Gagal memuat data pesanan");
    } finally {
      setIsLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.templates?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

  const formatDate = (date: string) => {
    return format(new Date(date), "dd MMM yyyy", { locale: id });
  };

  const handleDownloadInvoice = (orderId: string) => {
    toast.info("Fitur download invoice segera hadir");
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
      <div>
        <h1 className="font-cormorant text-4xl font-bold text-page-heading">Pesanan Saya</h1>
        <p className="mt-1 text-page-subtext">Kelola semua pesanan undangan digital Anda</p>
      </div>

      {/* Stats */}
      {orders.length > 0 && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Pesanan</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Belanja</p>
              <p className="text-2xl font-bold text-primary">{formatPrice(stats.totalSpent)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Selesai</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Menunggu</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari pesanan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="pending">Menunggu Pembayaran</SelectItem>
            <SelectItem value="paid">Dibayar</SelectItem>
            <SelectItem value="processing">Diproses</SelectItem>
            <SelectItem value="completed">Selesai</SelectItem>
            <SelectItem value="cancelled">Dibatalkan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pesanan</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Package className="h-16 w-16 text-empty-icon" />
              <h3 className="mt-4 text-lg font-medium">
                {orders.length === 0 ? "Belum ada pesanan" : "Tidak ada pesanan yang sesuai"}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {orders.length === 0 
                  ? "Pesanan baru akan muncul di sini" 
                  : "Coba ubah filter atau kata kunci pencarian"}
              </p>
              {orders.length === 0 && (
                <Button variant="default" className="mt-6" asChild>
                  <Link href="/templates">Jelajahi Template</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const status = statusConfig[order.status] || { label: order.status, variant: "secondary" as const };
                
                return (
                  <div 
                    key={order.id} 
                    className="flex flex-col gap-4 rounded-lg border p-4 hover:bg-muted/30 transition-colors sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-stat-card-icon-bg">
                        <Package className="h-6 w-6 text-stat-card-icon-color" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-semibold text-card-foreground">
                            {order.templates?.name || "Template"}
                          </h4>
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Order ID: {order.id.slice(0, 8)}...
                        </p>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <span>{order.customer_name}</span>
                          <span>{order.customer_email}</span>
                          <span>{formatDate(order.created_at)}</span>
                        </div>
                        {order.wedding_date && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            📅 Pernikahan: {formatDate(order.wedding_date)}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">
                          {formatPrice(order.total_amount)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.payment_method || "Belum dibayar"}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/orders/${order.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Detail
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadInvoice(order.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}