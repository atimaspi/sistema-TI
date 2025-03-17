import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface EquipmentOverviewProps {
  data?: {
    branches: {
      name: string;
      total: number;
      operational: number;
      maintenance: number;
      inactive: number;
    }[];
  };
}

const EquipmentOverview = ({
  data = {
    branches: [
      {
        name: "Sede Principal",
        total: 120,
        operational: 98,
        maintenance: 15,
        inactive: 7,
      },
      {
        name: "Filial Norte",
        total: 85,
        operational: 72,
        maintenance: 8,
        inactive: 5,
      },
      {
        name: "Filial Sul",
        total: 65,
        operational: 58,
        maintenance: 5,
        inactive: 2,
      },
      {
        name: "Filial Leste",
        total: 45,
        operational: 38,
        maintenance: 4,
        inactive: 3,
      },
    ],
  },
}: EquipmentOverviewProps) => {
  const totalEquipment = data.branches.reduce(
    (acc, branch) => acc + branch.total,
    0,
  );
  const totalOperational = data.branches.reduce(
    (acc, branch) => acc + branch.operational,
    0,
  );
  const totalMaintenance = data.branches.reduce(
    (acc, branch) => acc + branch.maintenance,
    0,
  );
  const totalInactive = data.branches.reduce(
    (acc, branch) => acc + branch.inactive,
    0,
  );

  const statusData = [
    { name: "Operacional", value: totalOperational, color: "#4ade80" },
    { name: "Em Manutenção", value: totalMaintenance, color: "#facc15" },
    { name: "Inativo", value: totalInactive, color: "#f87171" },
  ];

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Visão Geral de Equipamentos</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Equipamentos</CardDescription>
            <CardTitle className="text-3xl">{totalEquipment}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Operacionais</CardDescription>
            <CardTitle className="text-3xl text-green-500">
              {totalOperational}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Em Manutenção</CardDescription>
            <CardTitle className="text-3xl text-yellow-500">
              {totalMaintenance}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Inativos</CardDescription>
            <CardTitle className="text-3xl text-red-500">
              {totalInactive}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="chart">
        <TabsList className="mb-4">
          <TabsTrigger value="chart">Gráfico por Filial</TabsTrigger>
          <TabsTrigger value="status">Status Geral</TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.branches}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="operational" name="Operacional" fill="#4ade80" />
              <Bar dataKey="maintenance" name="Em Manutenção" fill="#facc15" />
              <Bar dataKey="inactive" name="Inativo" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="status" className="h-64">
          <div className="flex justify-center items-center h-full">
            <ResponsiveContainer width="70%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EquipmentOverview;
