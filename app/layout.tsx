import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eleganzas.vercel.app/"), // ganti domain lu
  title: {
    default: "Eleganzas - Undangan Digital & Website Profesional",
    template: "%s | Eleganzas",
  },
  description:
    "Eleganzas menyediakan layanan undangan digital elegan, website instansi, dan portfolio profesional. Cepat, modern, dan customizable sesuai kebutuhan Anda.",
  keywords: [
    "undangan digital",
    "website instansi",
    "jasa pembuatan website",
    "undangan online elegan",
    "digital invitation indonesia",
    "website portfolio profesional",
    "nextjs website builder",
  ],
  authors: [{ name: "Eleganzas" }],
  creator: "Eleganzas",
  publisher: "Eleganzas",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Eleganzas - Undangan Digital & Website Profesional",
    description:
      "Buat undangan digital elegan dan website profesional dengan Eleganzas. Desain premium, mudah digunakan, dan siap pakai.",
    url: "https://eleganzas.vercel.app/",
    siteName: "Eleganzas",
    images: [
      {
        url: "/logos.png", // wajib lu sediakan
        width: 1200,
        height: 630,
        alt: "Eleganzas Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Eleganzas - Undangan Digital & Website Profesional",
    description:
      "Platform undangan digital dan pembuatan website instansi modern.",
    images: ["/logos.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/logos.png",
  },

  alternates: {
    canonical: "https://eleganzas.vercel.app/",
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
    suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
   >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
