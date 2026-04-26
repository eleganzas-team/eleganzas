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
  CheckCircle,
  XCircle,
  Clock,
  Truck
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

interface OrdersTableProps {
  orders: any[];
  onRefresh: () => void;
}

const statusBadgeColors: Record<string, string> = {
  pending: "bg-yellow-500",
  paid: "bg-blue-500",
  processing: "bg-purple-500",
  completed: "bg-green-500",
  cancelled: "bg-red-500",
};

const statusIcons: Record<string, any> = {
  pending: Clock,
  paid: CheckCircle,
  processing: Truck,
  completed: CheckCircle,
  cancelled: XCircle,
};

export function OrdersTable({ orders, onRefresh }: OrdersTableProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleUpdateStatus = async (id: string, status: string) => {
    setIsLoading(true);
    const supabase = createClient();
    
    try {
      await supabase
        .from("orders")
        .update({ 
          status,
          updated_at: new Date().toISOString(),
          ...(status === "paid" ? { paid_at: new Date().toISOString() } : {})
        })
        .eq("id", id);
      
      toast.success(`Order status updated to ${status}`);
      onRefresh();
    } catch (error) {
      toast.error("Failed to update order status");
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatPrice = (price: number) => `Rp ${price.toLocaleString("id-ID")}`;
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Template</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              No orders found
            </TableCell>
          </TableRow>
        ) : (
          orders.map((order) => {
            const StatusIcon = statusIcons[order.status] || Clock;
            
            return (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-sm">
                  {order.order_number || order.id.slice(0, 8)}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{order.customer_email}</p>
                  </div>
                </TableCell>
                <TableCell>{order.templates?.name || "N/A"}</TableCell>
                <TableCell>{formatPrice(order.total_amount)}</TableCell>
                <TableCell>
                  <Badge className={statusBadgeColors[order.status] || "bg-gray-500"}>
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(order.created_at)}</TableCell>
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
                        <Link href={`/admin/orders/${order.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                      <DropdownMenuItem 
                        onClick={() => handleUpdateStatus(order.id, "pending")}
                        disabled={order.status === "pending" || isLoading}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleUpdateStatus(order.id, "paid")}
                        disabled={order.status === "paid" || isLoading}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Paid
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleUpdateStatus(order.id, "processing")}
                        disabled={order.status === "processing" || isLoading}
                      >
                        <Truck className="mr-2 h-4 w-4" />
                        Processing
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleUpdateStatus(order.id, "completed")}
                        disabled={order.status === "completed" || isLoading}
                      >
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleUpdateStatus(order.id, "cancelled")}
                        disabled={order.status === "cancelled" || isLoading}
                        className="text-destructive"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancelled
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}