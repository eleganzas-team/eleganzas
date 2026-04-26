"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "eleganzas",
    siteDescription: "Undangan Digital Premium",
    contactEmail: "eleganzas.team@gmail.com",
    contactPhone: "+62 812-3456-7890",
    address: "Jl. Sudirman No. 123, Jakarta",
    maintenanceMode: false,
    registrationEnabled: true,
    maxInvitationsPerUser: 10,
    defaultTier: "standard",
  });
  
  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Save to database
      const supabase = createClient();
      await supabase.from("settings").upsert({
        key: "general",
        value: settings,
      });
      
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage application settings</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(v) => setSettings({ ...settings, maintenanceMode: v })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="registrationEnabled">Enable Registration</Label>
                <Switch
                  id="registrationEnabled"
                  checked={settings.registrationEnabled}
                  onCheckedChange={(v) => setSettings({ ...settings, registrationEnabled: v })}
                />
              </div>
              
              <div>
                <Label htmlFor="maxInvitations">Max Invitations per User</Label>
                <Input
                  id="maxInvitations"
                  type="number"
                  value={settings.maxInvitationsPerUser}
                  onChange={(e) => setSettings({ ...settings, maxInvitationsPerUser: Number(e.target.value) })}
                  min={1}
                  max={100}
                />
              </div>
              
              <div>
                <Label htmlFor="defaultTier">Default Tier</Label>
                <select
                  id="defaultTier"
                  value={settings.defaultTier}
                  onChange={(e) => setSettings({ ...settings, defaultTier: e.target.value })}
                  className="w-full rounded-md border px-3 py-2"
                >
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="exclusive">Exclusive</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Settings
        </Button>
      </div>
    </div>
  );
}