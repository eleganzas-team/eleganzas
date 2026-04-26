import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar
} from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  
  // Get stats
  const { count: totalUsers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });
  
  const { count: totalTemplates } = await supabase
    .from("templates")
    .select("*", { count: "exact", head: true });
  
  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });
  
  const { data: orders } = await supabase
    .from("orders")
    .select("id, total_amount, status, created_at")
    .order("created_at", { ascending: false })
    .limit(10);
  
  const totalRevenue = orders?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0;
  
  const recentOrders = orders || [];
  
  const stats = [
    {
      title: "Total Users",
      value: totalUsers || 0,
      icon: Users,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Total Templates",
      value: totalTemplates || 0,
      icon: Package,
      change: "+5%",
      trend: "up",
    },
    {
      title: "Total Orders",
      value: totalOrders || 0,
      icon: ShoppingCart,
      change: "+18%",
      trend: "up",
    },
    {
      title: "Total Revenue",
      value: `Rp ${totalRevenue.toLocaleString("id-ID")}`,
      icon: DollarSign,
      change: "+23%",
      trend: "up",
    },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Admin</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs">
                  {stat.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                  <span className="ml-1 text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <p className="text-center text-muted-foreground">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Rp {order.total_amount?.toLocaleString("id-ID")}</p>
                    <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}