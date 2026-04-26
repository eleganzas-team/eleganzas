"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { invitationService } from "@/services/user-template.service";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Edit, Monitor } from "lucide-react";

import { IslamicLuxuryInvitationPage } from "@/components/undangan/pages/islami-lux/page";
import { EtherealInvitationPage } from "@/components/undangan/pages/ethereal/page";

const templateComponents: Record<string, React.ComponentType<any>> = {
  "islami-lux": IslamicLuxuryInvitationPage,
  "ethereal": EtherealInvitationPage,
};

function getTemplateComponent(slug: string) {
  return templateComponents[slug] || templateComponents["islami-lux"];
}

export default function PreviewPage() {
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

      setUserTemplate(data);
      setTemplate({
        id: data.templates?.id,
        name: data.templates?.name || "Template",
        slug: data.templates?.slug || "islami-lux",
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

  const TemplateComponent = getTemplateComponent(template.slug);
  const config = (userTemplate.config as Record<string, unknown>) || {};
  const userData = (config.content as Record<string, unknown>) || {};

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/dashboard/editor/${id}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-muted-foreground" />
              <div>
                <h1 className="text-sm font-semibold">Preview Mode</h1>
                <p className="text-xs text-muted-foreground">{template.name}</p>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" asChild className="gap-2">
            <Link href={`/dashboard/editor/${id}`}>
              <Edit className="h-3.5 w-3.5" />
              Kembali ke Editor
            </Link>
          </Button>
        </div>
      </div>

      <div className="pt-14">
        <TemplateComponent mode="preview" userConfig={userData} />
      </div>
    </div>
  );
}
