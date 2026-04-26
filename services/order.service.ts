import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];

export const orderService = {
  // Get user orders
  async getUserOrders(userId: string): Promise<Order[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        templates:template_id (*)
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Get order by ID
  async getById(id: string): Promise<Order | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        templates:template_id (*),
        invitations:invitation_id (*)
      `)
      .eq("id", id)
      .single();
    
    if (error) return null;
    return data;
  },

  // Create order
  async create(data: any): Promise<Order> {
    const supabase = createClient();
    
    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    const { data: order, error } = await supabase
      .from("orders")
      .insert({ ...data, order_number: orderNumber })
      .select("*")
      .single();
    
    if (error) throw error;
    return order;
  },

  // Update order status
  async updateStatus(id: string, status: string): Promise<void> {
    const supabase = createClient();
    await supabase
      .from("orders")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
  },

  // Get order stats for user
  async getUserStats(userId: string): Promise<{
    total: number;
    completed: number;
    pending: number;
    totalSpent: number;
  }> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("orders")
      .select("status, total_amount")
      .eq("user_id", userId);
    
    if (error) throw error;
    
    const stats = {
      total: data.length,
      completed: 0,
      pending: 0,
      totalSpent: 0,
    };
    
    data.forEach(order => {
      if (order.status === 'completed') stats.completed++;
      if (order.status === 'pending') stats.pending++;
      stats.totalSpent += order.total_amount || 0;
    });
    
    return stats;
  },
};