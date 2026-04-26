import Link from "next/link";
import { Sparkles } from "lucide-react";
import Image from "next/image";

import logo from "@/assets/logos-transparent.png"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background to-muted/30">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Image src={logo} alt="eleganzas"/>
            </div>
            <span className="font-cormorant text-xl font-bold text-foreground">
              eleganzas
            </span>
          </Link>
        </div>
      </header>
      
      <main className="flex flex-1 items-center justify-center p-4">
        {children}
      </main>
      
      <footer className="border-t border-border/40 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} eleganzas. Hak Cipta Dilindungi.
        </p>
      </footer>
    </div>
  );
}