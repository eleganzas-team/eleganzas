import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type UserInvitation = Database["public"]["Tables"]["user_template"]["Row"];

export const invitationService = {
  // Get user invitations
  async getUserInvitations(userId: string): Promise<UserInvitation[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("user_template")
      .select(`
        *,
        templates:template_id (*)
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<any> {
  const supabase = createClient();
  
  console.log("Fetching invitation with ID:", id);
  
  // First get the invitation
  const { data: invitation, error } = await supabase
    .from("user_template")
    .select("*")
    .eq("id", id)
    .single();
  
  if (error) {
    console.error("Error fetching invitation:", error);
    return null;
  }
  
  if (!invitation) {
    console.error("Invitation not found");
    return null;
  }
  
  console.log("Invitation found:", invitation);
  
  // Then get the template separately if template_id exists
  if (invitation.template_id) {
    const { data: template, error: templateError } = await supabase
      .from("templates")
      .select("*")
      .eq("id", invitation.template_id)
      .single();
    
    if (!templateError && template) {
      invitation.templates = template;
      console.log("Template loaded:", template);
    } else {
      console.warn("Template not found for ID:", invitation.template_id);
    }
  }
  
  return invitation;
},

  // Get invitation by slug (public)
  async getBySlug(slug: string): Promise<any> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("user_template")
      .select(`
        *,
        templates:template_id (*),
        template_config:template_id (template_config(*))
      `)
      .eq("slug", slug)
      .eq("is_published", true)
      .single();
    
    if (error) return null;
    
    // Increment views
    await supabase
      .from("user_template")
      .update({ views: (data.views || 0) + 1 })
      .eq("id", data.id);
    
    return data;
  },

  // Create invitation
  async create(data: any): Promise<UserInvitation> {
    const supabase = createClient();
    
    const slug = data.subdomain.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    const { data: invitation, error } = await supabase
      .from("user_template")
      .insert({ ...data, slug })
      .select("*")
      .single();
    
    if (error) throw error;
    return invitation;
  },

  // Update invitation
  async update(id: string, data: any): Promise<UserInvitation> {
    const supabase = createClient();
    const { data: invitation, error } = await supabase
      .from("user_template")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select("*")
      .single();
    
    if (error) throw error;
    return invitation;
  },

  // Save content data
  async saveContent(id: string, contentData: any): Promise<void> {
    const supabase = createClient();
    
    const { data: current } = await supabase
      .from("user_template")
      .select("config")
      .eq("id", id)
      .single();
    
    const updatedConfig = {
      ...(current?.config || {}),
      content: contentData,
    };
    
    await supabase
      .from("user_template")
      .update({ config: updatedConfig })
      .eq("id", id);
  },

  // Save features
  // async saveFeatures(id: string, features: any, featureSettings: any): Promise<void> {
  //   const supabase = createClient();
    
  //   const { data: current } = await supabase
  //     .from("user_template")
  //     .select("config")
  //     .eq("id", id)
  //     .single();
    
  //   const updatedConfig = {
  //     ...(current?.config || {}),
  //     features,
  //     featureConfig,
  //   };
    
  //   await supabase
  //     .from("user_template")
  //     .update({ settings: updatedSettings })
  //     .eq("id", id);
  // },

  // Publish invitation
  async publish(id: string): Promise<void> {
    const supabase = createClient();
    await supabase
      .from("user_template")
      .update({ 
        is_published: true,
        published_at: new Date().toISOString(),
      })
      .eq("id", id);
  },

  // Unpublish invitation
  async unpublish(id: string): Promise<void> {
    const supabase = createClient();
    await supabase
      .from("user_template")
      .update({ 
        is_published: false,
        published_at: null,
      })
      .eq("id", id);
  },

  // Delete invitation
  async delete(id: string): Promise<void> {
    const supabase = createClient();
    await supabase.from("user_template").delete().eq("id", id);
  },

  // Check subdomain availability
  async checkSubdomain(subdomain: string): Promise<boolean> {
    const supabase = createClient();
    const { data } = await supabase
      .from("user_template")
      .select("id")
      .eq("subdomain", subdomain)
      .single();
    
    return !data;
  },
};