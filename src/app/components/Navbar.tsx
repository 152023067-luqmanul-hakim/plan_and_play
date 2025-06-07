"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Dashboard", icon: "📊" },
    { href: "/matakuliah", label: "Mata Kuliah", icon: "📚" },
    { href: "/jadwal", label: "Jadwal Kuliah", icon: "📅" },
    { href: "/daftar-tugas", label: "Daftar Tugas", icon: "📝" },
    { href: "/rencana", label: "Rencana", icon: "🎯" },
  ];

  return (
    <nav className="h-full w-full bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 text-white flex flex-col gap-4 py-8 px-6 shadow-2xl rounded-3xl border border-orange-300/30 backdrop-blur-sm">
      <div className="border-b border-orange-200/30 pb-6 mb-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
          Plan & Play
        </h2>
        <p className="text-orange-100 text-sm mt-2 opacity-90">
          Rencanakan lalu mainkan
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className={`group relative overflow-hidden p-4 font-semibold text-lg rounded-xl transition-all duration-300 hover:translate-x-2 hover:shadow-lg ${
                isActive
                  ? "bg-white text-orange-500 shadow-lg"
                  : "hover:bg-white hover:text-orange-500"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
              <span className="relative flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pt-6 border-t border-orange-200/30">
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-orange-100 text-sm text-center opacity-90">
            "Kesuksesan datang ketika persiapan bertemu kesempatan"
          </p>
        </div>
      </div>
    </nav>
  );
}
