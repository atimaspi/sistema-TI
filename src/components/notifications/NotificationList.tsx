import React, { useState } from "react";
import {
  Bell,
  Filter,
  Search,
  Eye,
  Clock,
  AlertTriangle,
  CheckCircle,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Notification {
  id: string;
  title: string;
  description: string;
  type: "maintenance" | "problem" | "alert";
  status: "pending" | "resolved" | "in-progress";
  priority: "high" | "medium" | "low";
  date: string;
  equipment?: string;
  location?: string;
}

interface NotificationListProps {
  notifications?: Notification[];
}

const NotificationList = ({ notifications = [] }: NotificationListProps) => {
  // Default notifications if none provided
  const defaultNotifications: Notification[] = [
    {
      id: "1",
      title: "Manutenção Programada - Servidor Principal",
      description:
        "Manutenção preventiva agendada para o servidor principal da filial São Paulo.",
      type: "maintenance",
      status: "pending",
      priority: "high",
      date: "2023-06-15T10:00:00",
      equipment: "Servidor Dell PowerEdge R740",
      location: "São Paulo",
    },
    {
      id: "2",
      title: "Problema Reportado - Impressora Departamento Financeiro",
      description:
        "Usuários relataram falhas de impressão e atolamento de papel frequente.",
      type: "problem",
      status: "in-progress",
      priority: "medium",
      date: "2023-06-12T14:30:00",
      equipment: "HP LaserJet Pro MFP M428fdw",
      location: "Rio de Janeiro",
    },
    {
      id: "3",
      title: "Alerta de Segurança - Atualizações Pendentes",
      description:
        "Múltiplos computadores com atualizações de segurança críticas pendentes.",
      type: "alert",
      status: "pending",
      priority: "high",
      date: "2023-06-14T09:15:00",
      location: "Belo Horizonte",
    },
    {
      id: "4",
      title: "Manutenção Concluída - Roteadores Wi-Fi",
      description:
        "Atualização de firmware e configuração de segurança concluídas com sucesso.",
      type: "maintenance",
      status: "resolved",
      priority: "medium",
      date: "2023-06-10T16:45:00",
      equipment: "Roteadores Cisco Meraki MR46",
      location: "Brasília",
    },
    {
      id: "5",
      title: "Problema Resolvido - Estações de Trabalho Departamento de Design",
      description:
        "Problemas de desempenho em aplicativos gráficos resolvidos com atualização de drivers.",
      type: "problem",
      status: "resolved",
      priority: "low",
      date: "2023-06-11T11:20:00",
      equipment: "Workstations HP Z4 G4",
      location: "São Paulo",
    },
  ];

  const allNotifications =
    notifications.length > 0 ? notifications : defaultNotifications;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");

  // Filter notifications based on search and filters
  const filteredNotifications = allNotifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (notification.equipment &&
        notification.equipment
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (notification.location &&
        notification.location.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType =
      selectedType === "all" || notification.type === selectedType;
    const matchesStatus =
      selectedStatus === "all" || notification.status === selectedStatus;
    const matchesPriority =
      selectedPriority === "all" || notification.priority === selectedPriority;

    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pendente
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Em Andamento
          </Badge>
        );
      case "resolved":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Resolvido
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Helper function to render priority badge
  const renderPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>;
      case "medium":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Média
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="text-gray-600">
            Baixa
          </Badge>
        );
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  // Helper function to render type icon
  const renderTypeIcon = (type: string) => {
    switch (type) {
      case "maintenance":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "problem":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "alert":
        return <Bell className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="w-full bg-white p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-2xl font-bold">
              Notificações do Sistema
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros Avançados
              </Button>
              <Button variant="default" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Marcar Todas como Lidas
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <TabsList className="mb-4 md:mb-0">
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="pending">Pendentes</TabsTrigger>
                <TabsTrigger value="in-progress">Em Andamento</TabsTrigger>
                <TabsTrigger value="resolved">Resolvidas</TabsTrigger>
              </TabsList>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Buscar notificações..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Tipos</SelectItem>
                    <SelectItem value="maintenance">Manutenção</SelectItem>
                    <SelectItem value="problem">Problema</SelectItem>
                    <SelectItem value="alert">Alerta</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={selectedPriority}
                  onValueChange={setSelectedPriority}
                >
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Prioridades</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="low">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Notificação</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Equipamento
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Localização
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Data
                      </TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map((notification) => (
                        <TableRow key={notification.id}>
                          <TableCell>
                            {renderTypeIcon(notification.type)}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {notification.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {notification.description}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {notification.equipment || "-"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {notification.location || "-"}
                          </TableCell>
                          <TableCell>
                            {renderStatusBadge(notification.status)}
                          </TableCell>
                          <TableCell>
                            {renderPriorityBadge(notification.priority)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(notification.date)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-10">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <CheckCircle className="h-10 w-10 text-gray-300" />
                            <p className="text-lg font-medium text-gray-500">
                              Nenhuma notificação encontrada
                            </p>
                            <p className="text-sm text-gray-400">
                              Não há notificações que correspondam aos filtros
                              selecionados.
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-0">
              {/* Similar content as "all" tab but filtered for pending status */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Notificação</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Equipamento
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Localização
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Data
                      </TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNotifications
                      .filter((n) => n.status === "pending")
                      .map((notification) => (
                        <TableRow key={notification.id}>
                          <TableCell>
                            {renderTypeIcon(notification.type)}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {notification.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {notification.description}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {notification.equipment || "-"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {notification.location || "-"}
                          </TableCell>
                          <TableCell>
                            {renderStatusBadge(notification.status)}
                          </TableCell>
                          <TableCell>
                            {renderPriorityBadge(notification.priority)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(notification.date)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="in-progress" className="mt-0">
              {/* Similar content as "all" tab but filtered for in-progress status */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Notificação</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Equipamento
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Localização
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Data
                      </TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNotifications
                      .filter((n) => n.status === "in-progress")
                      .map((notification) => (
                        <TableRow key={notification.id}>
                          <TableCell>
                            {renderTypeIcon(notification.type)}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {notification.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {notification.description}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {notification.equipment || "-"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {notification.location || "-"}
                          </TableCell>
                          <TableCell>
                            {renderStatusBadge(notification.status)}
                          </TableCell>
                          <TableCell>
                            {renderPriorityBadge(notification.priority)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(notification.date)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="resolved" className="mt-0">
              {/* Similar content as "all" tab but filtered for resolved status */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Notificação</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Equipamento
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Localização
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Data
                      </TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNotifications
                      .filter((n) => n.status === "resolved")
                      .map((notification) => (
                        <TableRow key={notification.id}>
                          <TableCell>
                            {renderTypeIcon(notification.type)}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {notification.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {notification.description}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {notification.equipment || "-"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {notification.location || "-"}
                          </TableCell>
                          <TableCell>
                            {renderStatusBadge(notification.status)}
                          </TableCell>
                          <TableCell>
                            {renderPriorityBadge(notification.priority)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(notification.date)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationList;
