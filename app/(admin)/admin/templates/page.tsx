"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { TemplatesTable } from "./templates-table";
import { templateService } from "@/services/template.service";
import { Loader2 } from "lucide-react";

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadTemplates();
  }, []);
  
  const loadTemplates = async () => {
    try {
      const data = await templateService.getAll();
      setTemplates(data);
      console.log(data);
    } catch (error) {
      console.error("Error loading templates:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Templates</h1>
          <p className="text-muted-foreground">Manage all templates</p>
        </div>
        <Button asChild>
          <Link href="/admin/templates/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Template
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <TemplatesTable templates={templates} onRefresh={loadTemplates} />
        </CardContent>
      </Card>
    </div>
  );
}