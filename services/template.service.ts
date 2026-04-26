import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type Template = Database["public"]["Tables"]["templates"]["Row"];
type TemplateConfig = Database["public"]["Tables"]["template_config"]["Row"];

export const templateService = {
  // Get all active templates
  async getAll(): Promise<Template[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .order("type_template", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get template by ID
  async getById(id: string): Promise<Template | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  },

  // Get template with config
  async getByIdWithConfig(
    id: string,
  ): Promise<{ template: Template; config: TemplateConfig | null }> {
    const supabase = createClient();

    console.log("Fetching template with config for ID:", id);

    const { data: template, error: templateError } = await supabase
      .from("templates")
      .select("*")
      .eq("id", id)
      .single();

    if (templateError) {
      console.error("Template error:", templateError);
      throw templateError;
    }

    console.log("Template found:", template);

    const { data: config, error: configError } = await supabase
      .from("template_config")
      .select("*")
      .eq("template_id", id)
      .eq("status", "published")
      .maybeSingle(); // Use maybeSingle instead of single to avoid error when not found

    if (configError) {
      console.warn("Config error (may not exist):", configError);
    }

    console.log("Config found:", config);

    return { template, config: config || null };
  },
  // Get templates by tier
  async getByTier(tier: string): Promise<Template[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("type_template", tier)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get templates by category
  async getByCategory(category: string): Promise<Template[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get featured templates
  async getFeatured(limit = 8): Promise<Template[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Get trending templates
  async getTrending(limit = 8): Promise<Template[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("is_trending", true)
      
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Get new templates
  async getNew(limit = 8): Promise<Template[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("is_new", true)
      
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Search templates
  async search(query: string): Promise<Template[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      
      .or(
        `name.ilike.%${query}%,tagline.ilike.%${query}%,description.ilike.%${query}%`,
      );

    if (error) throw error;
    return data || [];
  },

  // Increment sales
  async incrementSales(id: string): Promise<void> {
    const supabase = createClient();
    await supabase.rpc("increment_template_sales", { template_id: id });
  },

  // Tambahkan method delete
  async delete(id: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase.from("templates").delete().eq("id", id);

    if (error) throw error;
  },
};
