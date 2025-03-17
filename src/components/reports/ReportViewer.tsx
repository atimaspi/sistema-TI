import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  LineChart,
  PieChart,
  Download,
  Printer,
  Share2,
} from "lucide-react";

interface ReportData {
  title: string;
  type: "bar" | "line" | "pie" | "table";
  data: any;
}

interface ReportViewerProps {
  report?: ReportData;
  onExport?: (format: string) => void;
  onPrint?: () => void;
  onShare?: () => void;
}

const ReportViewer = ({
  report = {
    title: "Relatório de Manutenção por Filial",
    type: "bar",
    data: {
      labels: ["Filial A", "Filial B", "Filial C", "Filial D", "Filial E"],
      datasets: [
        {
          label: "Manutenções Preventivas",
          data: [12, 19, 8, 15, 10],
        },
        {
          label: "Manutenções Corretivas",
          data: [7, 11, 5, 8, 3],
        },
      ],
    },
  },
  onExport = (format) =>
    console.log(`Exportando relatório em formato ${format}`),
  onPrint = () => console.log("Imprimindo relatório"),
  onShare = () => console.log("Compartilhando relatório"),
}: ReportViewerProps) => {
  const [viewType, setViewType] = useState<"chart" | "table">("chart");
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">(
    (report.type as any) || "bar",
  );

  // Função para renderizar o gráfico baseado no tipo selecionado
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <div className="h-96 w-full bg-slate-100 flex items-center justify-center">
            <div className="text-center">
              <BarChart className="h-16 w-16 mx-auto text-slate-400" />
              <p className="mt-2 text-slate-500">
                Gráfico de Barras: {report.title}
              </p>
              <p className="text-sm text-slate-400">
                Dados: {report.data.labels.join(", ")}
              </p>
            </div>
          </div>
        );
      case "line":
        return (
          <div className="h-96 w-full bg-slate-100 flex items-center justify-center">
            <div className="text-center">
              <LineChart className="h-16 w-16 mx-auto text-slate-400" />
              <p className="mt-2 text-slate-500">
                Gráfico de Linha: {report.title}
              </p>
              <p className="text-sm text-slate-400">
                Dados: {report.data.labels.join(", ")}
              </p>
            </div>
          </div>
        );
      case "pie":
        return (
          <div className="h-96 w-full bg-slate-100 flex items-center justify-center">
            <div className="text-center">
              <PieChart className="h-16 w-16 mx-auto text-slate-400" />
              <p className="mt-2 text-slate-500">
                Gráfico de Pizza: {report.title}
              </p>
              <p className="text-sm text-slate-400">
                Dados: {report.data.labels.join(", ")}
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="h-96 w-full bg-slate-100 flex items-center justify-center">
            <p>Tipo de gráfico não suportado</p>
          </div>
        );
    }
  };

  // Função para renderizar a tabela de dados
  const renderTable = () => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-200 p-2">Filial</th>
              {report.data.datasets.map((dataset: any, index: number) => (
                <th key={index} className="border border-slate-200 p-2">
                  {dataset.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {report.data.labels.map((label: string, labelIndex: number) => (
              <tr key={labelIndex} className="hover:bg-slate-50">
                <td className="border border-slate-200 p-2">{label}</td>
                {report.data.datasets.map(
                  (dataset: any, datasetIndex: number) => (
                    <td
                      key={datasetIndex}
                      className="border border-slate-200 p-2 text-center"
                    >
                      {dataset.data[labelIndex]}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">{report.title}</CardTitle>
        <div className="flex space-x-2">
          <Select defaultValue="pdf" onValueChange={(value) => onExport(value)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Exportar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="image">Imagem</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={onPrint}>
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <Tabs
            defaultValue="chart"
            className="w-[200px]"
            onValueChange={(value) => setViewType(value as any)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chart">Gráfico</TabsTrigger>
              <TabsTrigger value="table">Tabela</TabsTrigger>
            </TabsList>
          </Tabs>

          {viewType === "chart" && (
            <div className="flex space-x-2">
              <Button
                variant={chartType === "bar" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("bar")}
              >
                <BarChart className="h-4 w-4 mr-1" />
                Barras
              </Button>
              <Button
                variant={chartType === "line" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("line")}
              >
                <LineChart className="h-4 w-4 mr-1" />
                Linha
              </Button>
              <Button
                variant={chartType === "pie" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("pie")}
              >
                <PieChart className="h-4 w-4 mr-1" />
                Pizza
              </Button>
            </div>
          )}
        </div>

        <div className="mt-4 border rounded-md p-4 bg-white">
          {viewType === "chart" ? renderChart() : renderTable()}
        </div>

        <div className="mt-4 text-sm text-slate-500">
          <p>
            Relatório gerado em: {new Date().toLocaleDateString("pt-BR")} às{" "}
            {new Date().toLocaleTimeString("pt-BR")}
          </p>
          <p>
            Total de registros:{" "}
            {report.data.labels.length * report.data.datasets.length}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportViewer;
