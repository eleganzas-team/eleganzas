import { createClient } from "@/lib/supabase/client";
import type { Guest, GuestInsert, GuestUpdate } from "@/lib/supabase/types";

export const guestService = {
  // Get guests by invitation
  async getByInvitation(invitationId: string): Promise<Guest[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .eq("user_template_id", invitationId)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Get all guests for user
  async getUserGuests(userId: string): Promise<Guest[]> {
    const supabase = createClient();
    
    const { data: invitations } = await supabase
      .from("user_template")
      .select("id")
      .eq("user_id", userId);
    
    if (!invitations?.length) return [];
    
    const invitationIds = invitations.map(i => i.id);
    
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .in("user_template_id", invitationIds)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Add guest
  async add(guest: GuestInsert): Promise<Guest> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("guests")
      .insert(guest)
      .select("*")
      .single();
    
    if (error) throw error;
    return data;
  },

  // Add multiple guests (bulk import)
  async addBulk(guests: GuestInsert[]): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from("guests")
      .insert(guests);
    
    if (error) throw error;
  },

  // Update guest
  async update(id: string, updates: GuestUpdate): Promise<Guest> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("guests")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select("*")
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update guest status (RSVP)
  async updateStatus(id: string, status: Guest['status']): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from("guests")
      .update({ 
        status, 
        updated_at: new Date().toISOString() 
      })
      .eq("id", id);
    
    if (error) throw error;
  },

  // Delete guest
  async delete(id: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from("guests")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
  },

  // Get guest stats for an invitation
  async getStats(invitationId: string): Promise<{
    total: number;
    confirmed: number;
    pending: number;
    declined: number;
    totalGuests: number;
  }> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("guests")
      .select("status, plus_one")
      .eq("user_template_id", invitationId);
    
    if (error) throw error;
    
    const stats = {
      total: data.length,
      confirmed: 0,
      pending: 0,
      declined: 0,
      totalGuests: 0,
    };
    
    data.forEach(guest => {
      stats[guest.status as keyof typeof stats]++;
      if (guest.status === 'confirmed') {
        stats.totalGuests += 1 + (guest.plus_one || 0);
      }
    });
    
    return stats;
  },
};