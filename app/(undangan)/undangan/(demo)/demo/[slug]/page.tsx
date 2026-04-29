import React from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import { IslamicLuxuryInvitationPage } from "@/components/undangan/pages/islami-lux/page";
import { EtherealInvitationPage } from "@/components/undangan/pages/ethereal/page";

type PageProps = {
  params: Promise<{ slug: string; type: string }>;
};

async function fetchTemplate(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("templates")
    .select(
      `
      *
    `
    )
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error fetching invitation:", error);
    return null;
  }

  return data;
}


const templateComponents: Record<string, React.ComponentType<any>> = {
  "islami-lux": IslamicLuxuryInvitationPage,
  "ethereal": EtherealInvitationPage,
};

function getTemplateComponent(slug: string) {
  return templateComponents[slug] || templateComponents["islami-lux"];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const invitation = await fetchTemplate(slug);

  if (!invitation) {
    return {
      title: "Undangan Tidak Ditemukan",
    };
  }

  const template = invitation.templates as { name: string } | null;

  return {
    title: `${template?.name || "Undangan Digital"} - ${invitation.subdomain}`,
    description: "Undangan digital pernikahan",
  };
}

export default async function PublicInvitationPage({ params }: PageProps) {
  const { slug, type } = await params;

  const template = await fetchTemplate(slug);

  if (!template) {
    notFound();
  }

//   await incrementViews(invitation.id, invitation.views || 0);

//   const template = invitation.templates as {
//     id: string;
//     name: string;
//     slug: string;
//     theme: string | null;
//   } | null;

  if (!template) {
    notFound();
  }

  const TemplateComponent = getTemplateComponent(template.slug);

//   const config = (invitation.config as Record<string, unknown>) || {};
//   const userData = (config.content as Record<string, unknown>) || {};

  return <TemplateComponent mode="preview" />;
}
