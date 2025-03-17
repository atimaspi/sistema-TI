import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Bell, AlertTriangle, Info, Clock, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

type AlertPriority = "high" | "medium" | "low";
type AlertType = "maintenance" | "issue" | "notification";

interface Alert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  priority: AlertPriority;
  type: AlertType;
  equipment?: string;
  branch?: string;
}

interface ActiveAlertsProps {
  alerts?: Alert[];
}

const getPriorityColor = (priority: AlertPriority) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case "medium":
      return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    case "low":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const getAlertIcon = (type: AlertType) => {
  switch (type) {
    case "maintenance":
      return <Clock className="h-4 w-4 mr-1" />;
    case "issue":
      return <AlertTriangle className="h-4 w-4 mr-1" />;
    case "notification":
      return <Info className="h-4 w-4 mr-1" />;
    default:
      return <Bell className="h-4 w-4 mr-1" />;
  }
};

const AlertItem = ({ alert }: { alert: Alert }) => {
  return (
    <div className="mb-4 p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          {getAlertIcon(alert.type)}
          <h4 className="font-medium text-gray-900">{alert.title}</h4>
        </div>
        <Badge className={getPriorityColor(alert.priority)}>
          {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
        </Badge>
      </div>
      <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <div>
          {alert.equipment && (
            <span className="mr-2">Equipamento: {alert.equipment}</span>
          )}
          {alert.branch && <span>Filial: {alert.branch}</span>}
        </div>
        <span>{alert.timestamp}</span>
      </div>
      <div className="mt-3 flex justify-end">
        <Button variant="ghost" size="sm" className="text-xs">
          Ver detalhes <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

const ActiveAlerts = ({ alerts = defaultAlerts }: ActiveAlertsProps) => {
  return (
    <Card className="w-full h-full bg-gray-50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">Alertas Ativos</CardTitle>
            <CardDescription>
              Equipamentos que precisam de atenção
            </CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center">
            <Bell className="mr-1 h-3 w-3" />
            {alerts.length} alertas
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-4">
          {alerts.length > 0 ? (
            alerts.map((alert) => <AlertItem key={alert.id} alert={alert} />)
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Bell className="h-8 w-8 mb-2 opacity-30" />
              <p>Nenhum alerta ativo no momento</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const defaultAlerts: Alert[] = [
  {
    id: "1",
    title: "Manutenção Programada",
    description: "Servidor principal requer atualização de firmware",
    timestamp: "Hoje, 09:30",
    priority: "medium",
    type: "maintenance",
    equipment: "Servidor Dell PowerEdge R740",
    branch: "Matriz",
  },
  {
    id: "2",
    title: "Problema Crítico",
    description: "Falha no sistema de refrigeração do datacenter",
    timestamp: "Hoje, 08:15",
    priority: "high",
    type: "issue",
    equipment: "Sistema de Ar Condicionado",
    branch: "Filial SP",
  },
  {
    id: "3",
    title: "Licença Expirando",
    description: "Licença do software de segurança expira em 3 dias",
    timestamp: "Ontem, 14:45",
    priority: "low",
    type: "notification",
    equipment: "Firewall Corporativo",
    branch: "Todas",
  },
  {
    id: "4",
    title: "Equipamento Inativo",
    description: "Impressora sem comunicação há mais de 48 horas",
    timestamp: "Ontem, 10:20",
    priority: "medium",
    type: "issue",
    equipment: "Impressora HP LaserJet Pro",
    branch: "Filial RJ",
  },
  {
    id: "5",
    title: "Atualização Disponível",
    description:
      "Nova versão do sistema operacional disponível para instalação",
    timestamp: "22/05/2023, 16:30",
    priority: "low",
    type: "notification",
    equipment: "Estações de Trabalho",
    branch: "Todas",
  },
];

export default ActiveAlerts;
