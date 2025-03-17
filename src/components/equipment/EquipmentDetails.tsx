import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Printer,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
  ArrowLeft,
} from "lucide-react";

interface MaintenanceRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  technician: string;
  status: "Concluída" | "Pendente" | "Em andamento";
}

interface EquipmentDetailsProps {
  id?: string;
}

const EquipmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);

  // Mock data for equipment details
  const equipment = {
    id: id || "EQ-2023-001",
    name: "Notebook Dell Latitude 5420",
    type: "Notebook",
    serialNumber: "DELL-5420-78945612",
    purchaseDate: "2023-03-15",
    warrantyExpiration: "2026-03-15",
    status: "Operacional",
    location: "Filial São Paulo",
    department: "TI",
    assignedTo: "Carlos Silva",
    specifications: {
      processor: "Intel Core i7-1185G7",
      memory: "16GB DDR4",
      storage: "512GB SSD",
      operatingSystem: "Windows 11 Pro",
      display: "14 polegadas FHD",
    },
    maintenanceHistory: [
      {
        id: "MNT-001",
        date: "2023-06-10",
        type: "Preventiva",
        description: "Limpeza interna e atualização de drivers",
        technician: "João Oliveira",
        status: "Concluída",
      },
      {
        id: "MNT-002",
        date: "2023-09-22",
        type: "Corretiva",
        description: "Substituição de bateria com baixo desempenho",
        technician: "Mariana Costa",
        status: "Concluída",
      },
      {
        id: "MNT-003",
        date: "2024-01-15",
        type: "Preventiva",
        description: "Verificação geral e atualização de sistema",
        technician: "João Oliveira",
        status: "Pendente",
      },
    ] as MaintenanceRecord[],
  };

  const handleBack = () => {
    navigate("/app/equipamentos");
  };

  const handleEdit = () => {
    navigate(`/app/equipamentos/${id}/editar`);
  };

  const handleDelete = () => {
    // In a real application, this would delete the equipment and redirect
    console.log(`Delete equipment ${id}`);
    navigate("/app/equipamentos");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Operacional":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "Em Manutenção":
        return <Wrench className="h-5 w-5 text-amber-500" />;
      case "Inativo":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "Aguardando Peças":
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getMaintenanceStatusBadge = (status: string) => {
    switch (status) {
      case "Concluída":
        return <Badge className="bg-green-500">Concluída</Badge>;
      case "Pendente":
        return <Badge className="bg-amber-500">Pendente</Badge>;
      case "Em andamento":
        return <Badge className="bg-blue-500">Em andamento</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  // Simple maintenance form component
  const MaintenanceFormComponent = ({
    equipmentId,
    onSubmit,
  }: {
    equipmentId: string;
    onSubmit: () => void;
  }) => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              Tipo de Manutenção
            </label>
            <select id="type" className="w-full p-2 border rounded-md">
              <option value="preventiva">Preventiva</option>
              <option value="corretiva">Corretiva</option>
              <option value="upgrade">Upgrade</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">
              Data
            </label>
            <input
              type="date"
              id="date"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="technician" className="text-sm font-medium">
              Técnico Responsável
            </label>
            <input
              type="text"
              id="technician"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <select id="status" className="w-full p-2 border rounded-md">
              <option value="pendente">Pendente</option>
              <option value="em-andamento">Em andamento</option>
              <option value="concluida">Concluída</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Descrição
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onSubmit()}>
            Cancelar
          </Button>
          <Button onClick={() => onSubmit()}>Salvar</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold flex-1">Detalhes do Equipamento</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir este equipamento? Esta ação não
                  pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{equipment.name}</h2>
          <p className="text-gray-500">
            ID: {equipment.id} | Nº de Série: {equipment.serialNumber}
          </p>
        </div>
        <div className="flex items-center">
          {getStatusIcon(equipment.status)}
          <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
            {equipment.status}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="info">Informações Gerais</TabsTrigger>
          <TabsTrigger value="specs">Especificações Técnicas</TabsTrigger>
          <TabsTrigger value="maintenance">Histórico de Manutenção</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
              <CardDescription>
                Detalhes básicos sobre o equipamento
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Tipo</p>
                <p>{equipment.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Data de Aquisição
                </p>
                <p>{equipment.purchaseDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Garantia até
                </p>
                <p>{equipment.warrantyExpiration}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Localização</p>
                <p>{equipment.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Departamento
                </p>
                <p>{equipment.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Responsável</p>
                <p>{equipment.assignedTo}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Especificações Técnicas</CardTitle>
              <CardDescription>
                Detalhes técnicos do equipamento
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Processador</p>
                <p>{equipment.specifications.processor}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Memória</p>
                <p>{equipment.specifications.memory}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Armazenamento
                </p>
                <p>{equipment.specifications.storage}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Sistema Operacional
                </p>
                <p>{equipment.specifications.operatingSystem}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tela</p>
                <p>{equipment.specifications.display}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Histórico de Manutenção</CardTitle>
                <CardDescription>
                  Registro de manutenções realizadas
                </CardDescription>
              </div>
              <Dialog
                open={showMaintenanceForm}
                onOpenChange={setShowMaintenanceForm}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Wrench className="h-4 w-4 mr-2" />
                    Registrar Manutenção
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Registrar Nova Manutenção</DialogTitle>
                  </DialogHeader>
                  <MaintenanceFormComponent
                    equipmentId={equipment.id}
                    onSubmit={() => setShowMaintenanceForm(false)}
                  />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Técnico</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipment.maintenanceHistory.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.id}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.type}</TableCell>
                        <TableCell
                          className="max-w-[200px] truncate"
                          title={record.description}
                        >
                          {record.description}
                        </TableCell>
                        <TableCell>{record.technician}</TableCell>
                        <TableCell>
                          {getMaintenanceStatusBadge(record.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">
                Total de manutenções: {equipment.maintenanceHistory.length}
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EquipmentDetails;
