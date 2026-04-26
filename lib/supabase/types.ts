export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          full_name: string;
          avatar_url: string | null;
          role: string;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          full_name: string;
          avatar_url?: string | null;
          role?: string;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          full_name?: string;
          avatar_url?: string | null;
          role?: string;
          phone?: string | null;
          updated_at?: string;
        };
      };
      sessions: {
        Row: {
          id: string;
          user_id: string;
          token: string;
          expires_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          token: string;
          expires_at: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          token?: string;
          expires_at?: string;
        };
      };
      password_resets: {
        Row: {
          id: string;
          user_id: string;
          token: string;
          expires_at: string;
          used_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          token: string;
          expires_at: string;
          used_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          token?: string;
          expires_at?: string;
          used_at?: string | null;
        };
      };
      templates: {
        Row: {
          id: string;
          name: string;
          tagline: string | null;
          description: string | null;
          price: number;
          type_template: string;
          category: string;
          tags: string[] | null;
          theme: string | null;
          thumbnail: string | null;
          images: string[] | null;
          features: string[] | null;
          demo_url: string | null;
          rating: number;
          sales: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name?: string;
          tagline?: string | null;
          description?: string | null;
          price?: number;
          type_template?: string;
          category?: string;
          tags?: string[] | null;
          theme?: string | null;
          thumbnail?: string | null;
          images?: string[] | null;
          features?: string[] | null;
          demo_url?: string | null;
          rating?: number;
          sales?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          tagline?: string | null;
          description?: string | null;
          price?: number;
          type_template?: string;
          category?: string;
          tags?: string[] | null;
          theme?: string | null;
          thumbnail?: string | null;
          images?: string[] | null;
          features?: string[] | null;
          demo_url?: string | null;
          rating?: number;
          sales?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      template_config: {
        Row: {
          id: string;
          template_id: string;

          config: Json;

          status: "draft" | "published" | "archived";
          created_at: string;
          updated_at: string;
        };

        Insert: {
          id?: string;
          template_id: string;
          config?: Json;
          status?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
        };

        Update: {
          id?: string;
          template_id?: string;
          config?: Json;
          status?: "draft" | "published" | "archived";
          updated_at?: string;
        };
      };
      user_template: {
        Row: {
          id: string;
          user_id: string;
          template_id: string;
          order_id:string;
          config: Json;
          subdomain:string;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          template_id?: string;
          order_id?:string;
          config?: Json;
          subdomain?:string;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {id?: string;
          user_id?: string;
          template_id?: string;
          order_id?:string;
          config?: Json;
          subdomain?:string;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          template_id: string | null;
          user_template_id: string | null;
          order_number: string;
          status: "pending" | "paid" | "processing" | "completed" | "cancelled";
          total_amount: number;
          customer_name: string;
          customer_email: string;
          customer_phone: string | null;
          wedding_date: string | null;
          payment_method: string | null;
          payment_proof: string | null;
          paid_at: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          template_id?: string | null;
          user_template_id?: string | null;
          order_number: string;
          status?:
            | "pending"
            | "paid"
            | "processing"
            | "completed"
            | "cancelled";
          total_amount: number;
          customer_name: string;
          customer_email: string;
          customer_phone?: string | null;
          wedding_date?: string | null;
          payment_method?: string | null;
          payment_proof?: string | null;
          paid_at?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          template_id?: string | null;
          user_template_id?: string | null;
          order_number?: string;
          status?:
            | "pending"
            | "paid"
            | "processing"
            | "completed"
            | "cancelled";
          total_amount?: number;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string | null;
          wedding_date?: string | null;
          payment_method?: string | null;
          payment_proof?: string | null;
          paid_at?: string | null;
          notes?: string | null;
          updated_at?: string;
        };
      };
      wishlists: {
        Row: {
          id: string;
          user_id: string;
          template_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          template_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          template_id?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          template_id: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          template_id: string;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          template_id?: string;
          quantity?: number;
          updated_at?: string;
        };
      };
      guests: {
        Row: {
          id: string;
          user_template_id: string;
          name: string;
          email: string | null;
          phone: string | null;
          address: string | null;
          status: "pending" | "confirmed" | "declined";
          plus_one: number;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_template_id: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          status?: "pending" | "confirmed" | "declined";
          plus_one?: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_template_id?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          status?: "pending" | "confirmed" | "declined";
          plus_one?: number;
          notes?: string | null;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {
      increment_template_sales: {
        Args: { template_id: string };
        Returns: void;
      };
      generate_order_number: {
        Args: Record<string, never>;
        Returns: string;
      };
      generate_unique_slug: {
        Args: { base_name: string };
        Returns: string;
      };
    };
    Enums: {};
  };
}

// =====================================================
// HELPER TYPES
// =====================================================

export type Template = Database["public"]["Tables"]["templates"]["Row"];
export type TemplateInsert =
  Database["public"]["Tables"]["templates"]["Insert"];
export type TemplateUpdate =
  Database["public"]["Tables"]["templates"]["Update"];

export type TemplateConfig =
  Database["public"]["Tables"]["template_config"]["Row"];
export type TemplateConfigInsert =
  Database["public"]["Tables"]["template_config"]["Insert"];
export type TemplateConfigUpdate =
  Database["public"]["Tables"]["template_config"]["Update"];

export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
export type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"];


export type Guest = Database["public"]["Tables"]["guests"]["Row"];
export type GuestInsert = Database["public"]["Tables"]["guests"]["Insert"];
export type GuestUpdate = Database["public"]["Tables"]["guests"]["Update"];

export type Wishlist = Database["public"]["Tables"]["wishlists"]["Row"];
export type CartItem = Database["public"]["Tables"]["cart_items"]["Row"];
export type Session = Database["public"]["Tables"]["sessions"]["Row"];

// =====================================================
// TIER CONFIG
// =====================================================

export const TIER_CONFIG = {
  standard: {
    label: "Standard",
    icon: "Star",
    color: "blue",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    borderColor: "border-blue-500/30",
    priceRange: { min: 150000, max: 250000 },
  },
  premium: {
    label: "Premium",
    icon: "Crown",
    color: "amber",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-500",
    borderColor: "border-amber-500/30",
    priceRange: { min: 300000, max: 500000 },
  },
  exclusive: {
    label: "Exclusive",
    icon: "Gem",
    color: "purple",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    borderColor: "border-purple-500/30",
    priceRange: { min: 600000, max: 1000000 },
  },
} as const;

export type Tier = keyof typeof TIER_CONFIG;

// =====================================================
// ORDER STATUS CONFIG
// =====================================================

export const ORDER_STATUS_CONFIG = {
  pending: {
    label: "Menunggu Pembayaran",
    color: "yellow",
    variant: "pending",
  },
  paid: { label: "Dibayar", color: "blue", variant: "secondary" },
  processing: { label: "Diproses", color: "purple", variant: "warning" },
  completed: { label: "Selesai", color: "green", variant: "success" },
  cancelled: { label: "Dibatalkan", color: "red", variant: "destructive" },
} as const;

export type OrderStatus = keyof typeof ORDER_STATUS_CONFIG;

// =====================================================
// GUEST STATUS CONFIG
// =====================================================

export const GUEST_STATUS_CONFIG = {
  pending: { label: "Menunggu", color: "yellow", variant: "pending" },
  confirmed: { label: "Hadir", color: "green", variant: "success" },
  declined: { label: "Tidak Hadir", color: "red", variant: "destructive" },
} as const;

export type GuestStatus = keyof typeof GUEST_STATUS_CONFIG;
