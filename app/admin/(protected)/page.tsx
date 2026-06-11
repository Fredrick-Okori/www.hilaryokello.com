import React from "react";
import Link from "next/link";
import { CalendarDays, Images, BookOpen, Phone, Video } from "lucide-react";

const sections = [
  {
    label: "Shows",
    description: "Add, edit or remove upcoming shows",
    href: "/admin/shows",
    icon: CalendarDays,
  },
  {
    label: "Gallery",
    description: "Manage photo gallery images",
    href: "/admin/gallery",
    icon: Images,
  },
  {
    label: "Biography",
    description: "Update biography content",
    href: "/admin/biography",
    icon: BookOpen,
  },
  {
    label: "Booking",
    description: "Edit booking contact & details",
    href: "/admin/booking",
    icon: Phone,
  },
  {
    label: "Videos",
    description: "Manage featured and recommended videos",
    href: "/admin/videos",
    icon: Video,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-sm text-zinc-400 mt-1">
          Select a section below to start editing the website content.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ label, description, href, icon: Icon }) => (
          <Link
            key={href}
            className="group flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5 hover:border-yellow-400 hover:bg-zinc-800 transition-all duration-200"
            href={href}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400/10 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                <Icon size={20} />
              </div>
              <span className="text-base font-semibold text-white">
                {label}
              </span>
            </div>
            <p className="text-sm text-zinc-400">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
