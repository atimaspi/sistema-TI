import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Monitor,
  FileBarChart,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className = "" }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full w-[280px] flex-col bg-slate-900 text-white p-4",
        className,
      )}
    >
      <div className="flex items-center gap-2 mb-8 mt-2">
        <Monitor className="h-8 w-8 text-blue-400" />
        <h1 className="text-xl font-bold">SisGestão TI</h1>
      </div>

      <nav className="flex-1 space-y-1">
        <SidebarItem icon={<LayoutDashboard />} href="/" label="Dashboard" />
        <SidebarItem
          icon={<Monitor />}
          href="/app/equipamentos"
          label="Gestão de Equipamentos"
        />
        <SidebarItem
          icon={<FileBarChart />}
          href="/app/relatorios"
          label="Relatórios"
        />
        <SidebarItem
          icon={<Bell />}
          href="/app/notificacoes"
          label="Notificações"
          badge={3}
        />
        <SidebarItem
          icon={<Settings />}
          href="/app/configuracoes"
          label="Configurações"
        />
      </nav>

      <Separator className="my-4 bg-slate-700" />

      <div className="mt-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
              alt="Avatar do usuário"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">Administrador</p>
            <p className="text-sm text-slate-400">admin@empresa.com</p>
          </div>
        </div>

        <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors">
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  href: string;
  label: string;
  badge?: number;
}

function SidebarItem({ icon, href, label, badge }: SidebarItemProps) {
  const location = useLocation();
  const isActive =
    location.pathname === href || location.pathname.startsWith(`${href}/`);

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center justify-between rounded-md px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors",
        isActive && "bg-slate-800 text-white",
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn("text-slate-400", isActive && "text-blue-400")}>
          {icon}
        </span>
        <span>{label}</span>
      </div>
      {badge && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-medium">
          {badge}
        </span>
      )}
    </Link>
  );
}
