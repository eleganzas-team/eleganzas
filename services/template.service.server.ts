import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Template } from "@/lib/supabase/types";

export interface TemplateConfig {
  id: string;
  template_id: string;
  content_schema: any;
  design_tokens: any;
  features_schema: any;
  layout_config: any;
  custom_css: string | null;
  custom_js: string | null;
  components: any[];
  status: string;
  version: number;
  created_at: string;
  updated_at: string;
}

export const templateServiceServer = {
  async getAll(): Promise<Template[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("is_active", true)
      .order("tier", { ascending: false })
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getTrending(limit = 8): Promise<Template[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("is_trending", true)
      .eq("is_active", true)
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  },

  async getNew(limit = 8): Promise<Template[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("is_new", true)
      .eq("is_active", true)
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  },

  async getFeatured(limit = 8): Promise<Template[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("is_featured", true)
      .eq("is_active", true)
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  },
};