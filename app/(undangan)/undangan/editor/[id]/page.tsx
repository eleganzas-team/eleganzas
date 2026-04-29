"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { invitationService } from "@/services/user-template.service";
import { TemplateEditor } from "@/components/dashboard/editor/TemplateEditor";
import { Loader2 } from "lucide-react";

export default function EditorPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  
  const [userTemplate, setUserTemplate] = useState<any>(null);
  const [template, setTemplate] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }

    invitationService.getById(id).then((data) => {
      if (!data) {
        setError("Template tidak ditemukan");
        setIsLoading(false);
        return;
      }

      if (data.user_id !== user.id) {
        setError("Anda tidak memiliki akses ke template ini");
        setIsLoading(false);
        return;
      }

      setUserTemplate({
        id: data.id,
        config: (data.config as Record<string, unknown>) || {},
        is_published: data.is_published || false,
        subdomain: data.subdomain || "",
        template_id: data.template_id || "",
      });

      setTemplate({
        id: data.templates?.id,
        slug: data.templates?.slug || "islami-lux",
        name: data.templates?.name || "Template",
        theme: data.templates?.theme || null,
      });
      setIsLoading(false);
    }).catch((err) => {
      console.error("Error loading template:", err);
      setError("Gagal memuat template");
      setIsLoading(false);
    });
  }, [id, user, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-500">{error}</p>
          <button
            onClick={() => router.push("/dashboard/undangan")}
            className="mt-4 text-sm text-primary hover:underline"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!userTemplate || !template) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">Template tidak ditemukan</p>
      </div>
    );
  }

  return (
    <TemplateEditor userTemplate={userTemplate} template={template} />
  );
}
