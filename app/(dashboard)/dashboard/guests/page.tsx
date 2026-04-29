"use client";

import { motion } from "framer-motion";
import { Search, Download, Users, Mail, Phone, CheckCircle, XCircle, UserPlus, Loader2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { guestService } from "@/services/guest.service";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { AddGuestDialog } from "./add-guest-dialog";
import { Guest } from "@/lib/supabase/types";

export default function GuestsPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [invitations, setInvitations] = useState<{ id: string; name: string }[]>([]);
  const [selectedInvitation, setSelectedInvitation] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetchData();
  }, [user]);

  const fetchData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    const supabase = createClient();

    try {
      // Fetch user's invitations for filter
      const { data: invitationsData } = await supabase
        .from("user_invitations")
        .select(`
          id,
          templates:template_id (name)
        `)
        .eq("user_id", user.id);

      if (invitationsData) {
        setInvitations(
          invitationsData.map(inv => ({
            id: inv.id,
            name: (inv.templates as any)?.name || "Undangan",
          }))
        );
      }

      // Fetch guests
      const guestsData = await guestService.getUserGuests(user.id);
      setGuests(guestsData);
    } catch (error) {
      console.error("Error fetching guests:", error);
      toast.error("Gagal memuat data tamu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (guestId: string, status: Guest['status']) => {
    try {
      await guestService.updateStatus(guestId, status);
      setGuests(prev => prev.map(g => g.id === guestId ? { ...g, status } : g));
      toast.success("Status tamu diperbarui");
    } catch (error) {
      toast.error("Gagal memperbarui status");
    }
  };

  const handleDeleteGuest = async (guestId: string) => {
    try {
      await guestService.delete(guestId);
      setGuests(prev => prev.filter(g => g.id !== guestId));
      toast.success("Tamu dihapus");
    } catch (error) {
      toast.error("Gagal menghapus tamu");
    }
  };

  const handleAddGuest = async (data: any) => {
    try {
      const newGuest = await guestService.add(data);
      setGuests(prev => [newGuest, ...prev]);
      toast.success("Tamu berhasil ditambahkan");
      setIsAddDialogOpen(false);
    } catch (error) {
      toast.error("Gagal menambah tamu");
    }
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (guest.email?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesInvitation = selectedInvitation === "all" || guest.user_template_id === selectedInvitation;
    const matchesStatus = statusFilter === "all" || guest.status === statusFilter;
    return matchesSearch && matchesInvitation && matchesStatus;
  });

  const stats = {
    total: filteredGuests.length,
    confirmed: filteredGuests.filter(g => g.status === "confirmed").length,
    pending: filteredGuests.filter(g => g.status === "pending").length,
    declined: filteredGuests.filter(g => g.status === "declined").length,
    totalAttending: filteredGuests.reduce((sum, g) => 
      g.status === "confirmed" ? sum + 1 + (g.plus_one || 0) : sum, 0
    ),
  };

  const getInvitationName = (invitationId: string) => {
    return invitations.find(i => i.id === invitationId)?.name || "Undangan";
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-cormorant text-4xl font-bold text-page-heading">Data Tamu</h1>
          <p className="mt-1 text-page-subtext">Kelola daftar tamu dan RSVP undangan Anda</p>
        </div>
        <Button variant="default" onClick={() => setIsAddDialogOpen(true)} disabled={invitations.length === 0}>
          <UserPlus className="mr-2 h-4 w-4" />
          Tambah Tamu
        </Button>
      </div>

      {invitations.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-medium">Belum ada undangan</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Buat undangan terlebih dahulu untuk mulai menambah tamu
            </p>
            <Button variant="default" className="mt-4" asChild>
              <a href="/marketplace">Buat Undangan</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-5">
            <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total Tamu</p><p className="text-2xl font-bold">{stats.total}</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Hadir</p><p className="text-2xl font-bold text-green-600">{stats.confirmed}</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Menunggu</p><p className="text-2xl font-bold text-yellow-600">{stats.pending}</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Tidak Hadir</p><p className="text-2xl font-bold text-red-600">{stats.declined}</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total Hadir</p><p className="text-2xl font-bold text-blue-600">{stats.totalAttending}</p></CardContent></Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Cari tamu..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="pl-10" 
                />
              </div>
              
              <Select value={selectedInvitation} onValueChange={setSelectedInvitation}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Pilih Undangan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Undangan</SelectItem>
                  {invitations.map(inv => (
                    <SelectItem key={inv.id} value={inv.id}>{inv.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="confirmed">Hadir</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="declined">Tidak Hadir</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          {/* Guests List */}
          <Card>
            <CardHeader><CardTitle>Daftar Tamu</CardTitle></CardHeader>
            <CardContent>
              {filteredGuests.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  <Users className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-2">Tidak ada data tamu</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredGuests.map((guest) => (
                    <div key={guest.id} className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-user-avatar-bg">
                          <Users className="h-5 w-5 text-user-avatar-text" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-semibold">{guest.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {getInvitationName(guest.user_template_id)}
                            </Badge>
                            <Badge 
                              variant={guest.status === "confirmed" ? "success" : guest.status === "pending" ? "pending" : "destructive"}
                            >
                              {guest.status === "confirmed" ? "Hadir" : guest.status === "pending" ? "Menunggu" : "Tidak Hadir"}
                            </Badge>
                            {guest.plus_one > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                +{guest.plus_one} tamu
                              </Badge>
                            )}
                          </div>
                          <div className="mt-1 grid grid-cols-1 gap-1 text-sm text-muted-foreground sm:grid-cols-3">
                            {guest.email && (
                              <div className="flex items-center gap-1"><Mail className="h-3 w-3" />{guest.email}</div>
                            )}
                            {guest.phone && (
                              <div className="flex items-center gap-1"><Phone className="h-3 w-3" />{guest.phone}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={guest.status} onValueChange={(value) => handleStatusChange(guest.id, value as Guest['status'])}>
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Menunggu</SelectItem>
                            <SelectItem value="confirmed">Hadir</SelectItem>
                            <SelectItem value="declined">Tidak Hadir</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive"
                          onClick={() => handleDeleteGuest(guest.id)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      <AddGuestDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddGuest}
        invitations={invitations}
      />
    </motion.div>
  );
}