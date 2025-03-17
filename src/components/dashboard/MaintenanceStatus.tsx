import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { AlertTriangle, CheckCircle, Clock, Settings } from "lucide-react";

interface MaintenanceStatusProps {
  data?: MaintenanceData[];
  branches?: Branch[];
  selectedBranch?: string;
  onBranchChange?: (branchId: string) => void;
}

interface MaintenanceData {
  name: string;
  value: number;
  color: string;
}

interface Branch {
  id: string;
  name: string;
}

const MaintenanceStatus = ({
  data = [
    { name: "Operacional", value: 75, color: "#10b981" },
    { name: "Em Manutenção", value: 15, color: "#f59e0b" },
    { name: "Inativo", value: 10, color: "#ef4444" },
  ],
  branches = [
    { id: "all", name: "Todas as Filiais" },
    { id: "branch1", name: "Filial São Paulo" },
    { id: "branch2", name: "Filial Rio de Janeiro" },
    { id: "branch3", name: "Filial Belo Horizonte" },
  ],
  selectedBranch = "all",
  onBranchChange = () => {},
}: MaintenanceStatusProps) => {
  const [activeTab, setActiveTab] = useState("chart");

  // Status cards data
  const statusCards = [
    {
      title: "Operacional",
      value: data.find((item) => item.name === "Operacional")?.value || 0,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
    },
    {
      title: "Em Manutenção",
      value: data.find((item) => item.name === "Em Manutenção")?.value || 0,
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      color: "bg-amber-50 border-amber-200",
      textColor: "text-amber-700",
    },
    {
      title: "Inativo",
      value: data.find((item) => item.name === "Inativo")?.value || 0,
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      color: "bg-red-50 border-red-200",
      textColor: "text-red-700",
    },
  ];

  // Equipment list data (mock data)
  const equipmentList = [
    {
      id: 1,
      name: "Laptop Dell XPS",
      status: "Em Manutenção",
      branch: "Filial São Paulo",
      nextMaintenance: "15/06/2023",
    },
    {
      id: 2,
      name: "Impressora HP LaserJet",
      status: "Inativo",
      branch: "Filial Rio de Janeiro",
      nextMaintenance: "N/A",
    },
    {
      id: 3,
      name: "Desktop Lenovo ThinkCentre",
      status: "Em Manutenção",
      branch: "Filial Belo Horizonte",
      nextMaintenance: "22/06/2023",
    },
    {
      id: 4,
      name: "Monitor LG UltraWide",
      status: "Operacional",
      branch: "Filial São Paulo",
      nextMaintenance: "30/07/2023",
    },
    {
      id: 5,
      name: "Roteador Cisco",
      status: "Em Manutenção",
      branch: "Filial Rio de Janeiro",
      nextMaintenance: "10/06/2023",
    },
  ];

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold">
              Status de Manutenção
            </CardTitle>
            <CardDescription>
              Visão geral do status de manutenção dos equipamentos
            </CardDescription>
          </div>
          <Select value={selectedBranch} onValueChange={onBranchChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Selecione a filial" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="chart"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="chart">Gráfico</TabsTrigger>
            <TabsTrigger value="list">Lista de Equipamentos</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {statusCards.map((card, index) => (
                <div
                  key={index}
                  className={`flex items-center p-4 rounded-lg border ${card.color}`}
                >
                  <div className="mr-4">{card.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {card.title}
                    </p>
                    <p className={`text-2xl font-bold ${card.textColor}`}>
                      {card.value}%
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="py-3 px-4 text-left font-medium">
                      Equipamento
                    </th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                    <th className="py-3 px-4 text-left font-medium">Filial</th>
                    <th className="py-3 px-4 text-left font-medium">
                      Próxima Manutenção
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {equipmentList.map((equipment) => (
                    <tr
                      key={equipment.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">{equipment.name}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            equipment.status === "Operacional"
                              ? "bg-green-100 text-green-800"
                              : equipment.status === "Em Manutenção"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {equipment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{equipment.branch}</td>
                      <td className="py-3 px-4">{equipment.nextMaintenance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MaintenanceStatus;
