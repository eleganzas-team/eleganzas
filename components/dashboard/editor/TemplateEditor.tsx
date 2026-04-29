"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Save, 
  Eye, 
  Globe, 
  ArrowLeft, 
  Loader2,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { IslamicLuxuryInvitationPage } from "@/components/undangan/pages/islami-lux/page";
import { EtherealInvitationPage } from "@/components/undangan/pages/ethereal/page";
import { invitationService } from "@/services/user-template.service";

interface TemplateEditorProps {
  userTemplate: {
    id: string;
    config: Record<string, unknown>;
    is_published: boolean;
    subdomain: string;
    template_id: string;
  };
  template: {
    id: string;
    slug: string;
    name: string;
    theme: string | null;
  };
}

// Template component registry
const templateComponents: Record<string, React.ComponentType<any>> = {
  "islami-lux": IslamicLuxuryInvitationPage,
  "ethereal": EtherealInvitationPage,
  // Add more templates here
};

function getTemplateComponent(name: string) {
  return templateComponents[name] || templateComponents["islami-lux"];
}

export function TemplateEditor({ userTemplate, template }: TemplateEditorProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const config = (userTemplate.config as Record<string, unknown>) || {};
  const initialUserData = (config.content as Record<string, unknown>) || {};
  const [latestUserData, setLatestUserData] = useState<Record<string, unknown>>(initialUserData);


  const handleUserDataChange = useCallback((userData: Record<string, unknown>) => {
    setLatestUserData(userData);
    setHasChanges(true);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await invitationService.saveContent(userTemplate.id, latestUserData);
      setHasChanges(false);
      toast.success("Perubahan berhasil disimpan!");
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Gagal menyimpan perubahan");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    // Save first if there are changes
    if (hasChanges) {
      toast.info("Menyimpan perubahan sebelum preview...");
      handleSave().then(() => {
        router.push(`/dashboard/preview/${userTemplate.id}`);
      });
    } else {
      router.push(`/dashboard/preview/${userTemplate.id}`);
    }
  };

  const handlePublish = async () => {
    if (hasChanges) {
      toast.info("Menyimpan perubahan sebelum publish...");
      await handleSave();
    }

    setIsPublishing(true);
    try {
      await invitationService.publish(userTemplate.id);
      toast.success("Undangan berhasil dipublish!");
      router.refresh();
    } catch (error) {
      console.error("Error publishing:", error);
      toast.error("Gagal publish undangan");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    setIsPublishing(true);
    try {
      await invitationService.unpublish(userTemplate.id);
      toast.success("Undangan di-unpublish");
      router.refresh();
    } catch (error) {
      console.error("Error unpublishing:", error);
      toast.error("Gagal unpublish undangan");
    } finally {
      setIsPublishing(false);
    }
  };

  const TemplateComponent = getTemplateComponent(template.name);

  return (
    <div className="min-h-screen bg-background">
      {/* Editor Top Bar */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="flex h-14 items-center justify-between px-4 lg:px-6">
          {/* Left: Back button & Title */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard/undangan")}
              className="shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold">{template.name}</h1>
              <p className="text-xs text-muted-foreground">
                {userTemplate.subdomain}.eleganzas.id
              </p>
            </div>
          </div>

          {/* Center: Status */}
          <div className="flex items-center gap-2">
            {hasChanges && (
              <span className="text-xs text-amber-500 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Ada perubahan belum disimpan
              </span>
            )}
            {userTemplate.is_published ? (
              <span className="text-xs text-green-500 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Published
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">Draft</span>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={isSaving || !hasChanges}
              className="gap-2"
            >
              {isSaving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              <span className="hidden sm:inline">Simpan</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handlePreview}
              className="gap-2"
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Preview</span>
            </Button>

            {userTemplate.is_published ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleUnpublish}
                disabled={isPublishing}
                className="gap-2"
              >
                {isPublishing ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Globe className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">Unpublish</span>
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={handlePublish}
                disabled={isPublishing}
                className="gap-2"
              >
                {isPublishing ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Globe className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">Publish</span>
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Template Content */}
      <div className="pt-14">
        <TemplateComponent
          mode="editor"
          userConfig={latestUserData}
          onUserDataChange={handleUserDataChange}
          userTemplateId={userTemplate.id}
        />
      </div>
    </div>
  );
}
