import React from "react";
import { Bell, Search, User } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface HeaderProps {
  title?: string;
  notificationCount?: number;
  userName?: string;
  userAvatar?: string;
}

const Header = ({
  title = "Dashboard",
  notificationCount = 3,
  userName = "Admin User",
  userAvatar = "",
}: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-6 w-full">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>

      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative w-64 lg:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar equipamento..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                {notificationCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs"
                    variant="destructive"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notificações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Manutenção Programada</span>
                    <span className="text-sm text-gray-500">
                      Computador ID-1234 requer manutenção preventiva
                    </span>
                    <span className="text-xs text-gray-400">Há 2 horas</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Problema Reportado</span>
                    <span className="text-sm text-gray-500">
                      Impressora ID-5678 com falha de conexão
                    </span>
                    <span className="text-xs text-gray-400">Há 5 horas</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Alerta de Sistema</span>
                    <span className="text-sm text-gray-500">
                      Servidor principal com uso de CPU elevado
                    </span>
                    <span className="text-xs text-gray-400">Há 1 dia</span>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-blue-600 cursor-pointer">
                Ver todas as notificações
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-gray-100 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-blue-500 text-white">
                  {userName
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden md:inline">
                {userName}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
