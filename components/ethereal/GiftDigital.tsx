"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function GiftDigital({
  title,
  message,
  accounts,
}: {
  title: string;
  message: string;
  accounts: { bank: string; number: string; name: string }[];
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-serif mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">{message}</p>
      <div className="space-y-3 max-w-sm mx-auto">
        {accounts.map((account, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-xl border bg-card"
          >
            <div className="text-left">
              <p className="font-medium text-sm">{account.bank}</p>
              <p className="text-xs text-muted-foreground">{account.number}</p>
              <p className="text-xs text-muted-foreground">{account.name}</p>
            </div>
            <button
              onClick={() => handleCopy(account.number)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              {copied === account.number ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
