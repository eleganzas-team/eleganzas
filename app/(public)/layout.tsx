import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
// import { CompareBar } from "@/components/compare/compare-bar";
// import { BackToTop } from "@/components/ui/back-to-top";
// import { CookieConsent } from "@/components/ui/cookie-consent";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <PublicFooter />
      {/* <CompareBar />
      <BackToTop />
      <CookieConsent /> */}
    </div>
  );
}