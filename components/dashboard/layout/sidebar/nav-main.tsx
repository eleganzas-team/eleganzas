"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type MenuSection } from "@/lib/menu-config";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function NavMain({
  section,
  pathname,
}: {
  section: MenuSection;
  pathname: string;
}) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="px-3 space-y-1">
      {/* Section Label */}
      <div className="px-3 mb-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-nav-section-label">
          {section.title}
        </h2>
      </div>

      {/* Section Items */}
      {section.items.map((item) => {
        const isActive = pathname === item.url || pathname?.startsWith(item.url + "/");
        const hasChildren = item.items && item.items.length > 0;
        const isExpanded = expandedItems.includes(item.title);

        if (hasChildren) {
          return (
            <div key={item.url}>
              <button
                onClick={() => toggleExpanded(item.title)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  "text-nav-text hover:text-nav-text-hover hover:bg-nav-bg-hover",
                  isActive && "bg-nav-bg-active text-nav-text-active"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    "text-nav-icon",
                    isActive && "text-nav-icon-active"
                  )}
                />
                <span className="flex-1 text-left">{item.title}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isExpanded && "rotate-180"
                  )}
                />
              </button>
              
              {isExpanded && (
                <div className="ml-9 mt-1 space-y-1">
                  {item.items && item.items.map((child) => {
                    const isChildActive = pathname === child.url;
                    return (
                      <Link
                        key={child.url}
                        href={child.url}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                          "text-nav-child-text hover:text-nav-text-hover hover:bg-nav-child-bg-hover",
                          isChildActive && "bg-nav-child-bg-active text-nav-child-text-active"
                        )}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-nav-child-dot" />
                        <span>{child.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.url}
            href={item.url}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
              "text-nav-text hover:text-nav-text-hover hover:bg-nav-bg-hover",
              isActive && "bg-nav-bg-active text-nav-text-active"
            )}
          >
            <item.icon
              className={cn(
                "h-5 w-5 transition-colors",
                "text-nav-icon",
                isActive && "text-nav-icon-active"
              )}
            />
            <span className="flex-1">{item.title}</span>

            {/* Active Indicator */}
            {isActive && (
              <motion.div
                layoutId="active-indicator"
                className="h-1.5 w-1.5 rounded-full bg-nav-icon-active"
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}