import Link from "next/link";
import { Sparkles, Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "@/components/SocialIcons";

import logo from "@/assets/logos-transparent.png"
import Image from "next/image";

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Image src={logo} alt="eleganzas"/>
              </div>
              <div>
                <h2 className="font-cormorant text-xl font-bold text-foreground">eleganzas</h2>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Undangan Digital</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Ciptakan momen tak terlupakan dengan undangan digital elegan yang dapat disesuaikan.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <InstagramIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <TwitterIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/marketplace" className="text-muted-foreground hover:text-primary">Marketplace</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-primary">Harga</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">Tentang Kami</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Kontak</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Bantuan</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="text-muted-foreground hover:text-primary">Pusat Bantuan</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Kebijakan Privasi</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Syarat & Ketentuan</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Hubungi Kami</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">Jl. Sudirman No. 123, Jakarta Selatan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">eleganzas.team@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} eleganzas. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}