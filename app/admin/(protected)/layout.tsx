"use client";

import type { User } from "@supabase/supabase-js";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Images,
  BookOpen,
  Phone,
  Video,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
  Menu,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Shows", href: "/admin/shows", icon: CalendarDays },
  { label: "Waitinglist", href: "/admin/waitinglist", icon: BookOpen },
  { label: "Gallery", href: "/admin/gallery", icon: Images },
  { label: "Biography", href: "/admin/biography", icon: BookOpen },
  { label: "Booking", href: "/admin/booking", icon: Phone },
  { label: "Videos", href: "/admin/videos", icon: Video },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 flex h-full flex-col border-r border-zinc-800 bg-zinc-900 transition-all duration-300
          ${collapsed ? "w-16" : "w-60"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0`}
      >
        {/* Logo row */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-800">
          {!collapsed && (
            <Image
              alt="Dr. Hilary Okello"
              className="object-contain"
              height={32}
              src="/hilary_white.webp"
              width={110}
            />
          )}
          <button
            aria-label="Toggle sidebar"
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-md hover:bg-zinc-800 transition-colors"
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                  ${
                    active
                      ? "bg-yellow-400 text-black"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                href={href}
                onClick={() => setMobileOpen(false)}
              >
                <Icon className="shrink-0" size={18} />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="border-t border-zinc-800 px-2 py-4 space-y-1">
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            href="/"
            target="_blank"
          >
            <ExternalLink className="shrink-0" size={18} />
            {!collapsed && <span>View Site</span>}
          </Link>
          <button
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-red-400 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="shrink-0" size={18} />
            {!collapsed && <span>Log out</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center gap-4 border-b border-zinc-800 bg-zinc-900 px-4 md:px-6">
          <button
            aria-label="Open menu"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md hover:bg-zinc-800"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>
          <h1 className="text-sm font-semibold text-zinc-300 capitalize">
            {navItems.find((n) => n.href === pathname)?.label ?? "Admin"}
          </h1>
          <div className="ml-auto flex items-center gap-2">
            {user && (
              <span className="text-xs text-zinc-500 hidden sm:block truncate max-w-[180px]">
                {user.email}
              </span>
            )}
            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black text-xs font-bold shrink-0">
              {user?.email?.[0]?.toUpperCase() ?? "A"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
