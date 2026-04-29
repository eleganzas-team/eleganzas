"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface AddGuestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  invitations: { id: string; name: string }[];
}

export function AddGuestDialog({ isOpen, onClose, onSubmit, invitations }: AddGuestDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    invitation_id: invitations[0]?.id || "",
    name: "",
    email: "",
    phone: "",
    plus_one: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.invitation_id) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await onSubmit(formData);
      setFormData({
        invitation_id: invitations[0]?.id || "",
        name: "",
        email: "",
        phone: "",
        plus_one: 0,
      });
    } catch (error) {
      console.error("Error adding guest:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Tamu Baru</DialogTitle>
          <DialogDescription>
            Masukkan data tamu untuk undangan Anda
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invitation">Undangan *</Label>
            <Select 
              value={formData.invitation_id} 
              onValueChange={(value) => setFormData({ ...formData, invitation_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Undangan" />
              </SelectTrigger>
              <SelectContent>
                {invitations.map(inv => (
                  <SelectItem key={inv.id} value={inv.id}>{inv.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Budi Santoso"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="budi@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Nomor Telepon</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+62812345678"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="plus_one">Tambah Tamu (+1)</Label>
            <Input
              id="plus_one"
              type="number"
              min={0}
              max={10}
              value={formData.plus_one}
              onChange={(e) => setFormData({ ...formData, plus_one: parseInt(e.target.value) || 0 })}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Batal
            </Button>
            <Button type="submit" variant="default" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...</>
              ) : (
                "Simpan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}