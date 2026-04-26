import { Suspense } from "react";
import { UserTemplateContent } from "./invitations-content";

export default function InvitationsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <UserTemplateContent />
    </Suspense>
  );
}