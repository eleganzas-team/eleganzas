"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { OrdersTable } from "./orders-table";
import { orderService } from "@/services/order.service";
import { Loader2 } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadOrders();
  }, []);
  
  const loadOrders = async () => {
    try {
      const supabase = (await import("@/lib/supabase/client")).createClient();
      const { data } = await supabase
        .from("orders")
        .select(`
          *,
          templates:template_id (name),
          users:user_id (full_name, email)
        `)
        .order("created_at", { ascending: false });
      
      setOrders(data || []);
    } catch (error) {
      console.error("Error loading orders:", error);
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
        <h1 className="font-heading text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage all orders</p>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <OrdersTable orders={orders} onRefresh={loadOrders} />
        </CardContent>
      </Card>
    </div>
  );
}