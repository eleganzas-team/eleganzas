"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { CartProvider } from "@/contexts/cart-context";
import { WishlistProvider } from "@/contexts/wishlist-context";
// import { CompareProvider } from "@/contexts/compare-context";
// import { RecentlyViewedProvider } from "@/contexts/recently-viewed-context";
import { AuthProvider } from "@/contexts/auth-context";
// import { Toaster } from "sonner";
import * as React from "react";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {/* <CompareProvider>
              <RecentlyViewedProvider> */}
                {children}
                <Toaster position="bottom-right" richColors closeButton theme="system" />
              {/* </RecentlyViewedProvider>
            </CompareProvider> */}
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </NextThemesProvider>
  );
}