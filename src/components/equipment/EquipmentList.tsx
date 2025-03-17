import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  location: string;
  branch: string;
  responsible: string;
  status: "Operacional" | "Em Manutenção" | "Inativo";
  lastMaintenance: string;
}

interface EquipmentListProps {
  equipments?: Equipment[];
}

const EquipmentList = ({
  equipments = [
    {
      id: "1",
      name: "Notebook Dell Latitude",
      type: "Notebook",
      serialNumber: "DL-2023-001",
      location: "Departamento de TI",
      branch: "Matriz",
      responsible: "João Silva",
      status: "Operacional",
      lastMaintenance: "2023-10-15",
    },
    {
      id: "2",
      name: "Impressora HP LaserJet",
      type: "Impressora",
      serialNumber: "HP-2022-045",
      location: "Recepção",
      branch: "Filial 1",
      responsible: "Maria Santos",
      status: "Em Manutenção",
      lastMaintenance: "2023-11-20",
    },
    {
      id: "3",
      name: "Desktop Lenovo ThinkCentre",
      type: "Desktop",
      serialNumber: "LN-2021-112",
      location: "Departamento Financeiro",
      branch: "Matriz",
      responsible: "Carlos Oliveira",
      status: "Operacional",
      lastMaintenance: "2023-09-05",
    },
    {
      id: "4",
      name: "Projetor Epson",
      type: "Projetor",
      serialNumber: "EP-2022-033",
      location: "Sala de Reuniões",
      branch: "Filial 2",
      responsible: "Ana Pereira",
      status: "Inativo",
      lastMaintenance: "2023-08-12",
    },
    {
      id: "5",
      name: "Switch Cisco",
      type: "Rede",
      serialNumber: "CS-2023-078",
      location: "Sala de Servidores",
      branch: "Matriz",
      responsible: "Roberto Almeida",
      status: "Operacional",
      lastMaintenance: "2023-12-01",
    },
  ],
}: EquipmentListProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Handler functions
  const handleAddEquipment = () => navigate("/app/equipamentos/novo");
  const handleViewEquipment = (id: string) =>
    navigate(`/app/equipamentos/${id}`);
  const handleEditEquipment = (id: string) =>
    navigate(`/app/equipamentos/${id}/editar`);
  const handleDeleteEquipment = (id: string) => {
    // In a real application, this would show a confirmation dialog and then delete the equipment
    console.log(`Delete equipment ${id}`);
  };

  // Filter equipments based on search term and filters
  const filteredEquipments = equipments.filter((equipment) => {
    const matchesSearch =
      searchTerm === "" ||
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.responsible.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBranch =
      branchFilter === "all" || equipment.branch === branchFilter;

    const matchesStatus =
      statusFilter === "all" || equipment.status === statusFilter;

    const matchesType = typeFilter === "all" || equipment.type === typeFilter;

    return matchesSearch && matchesBranch && matchesStatus && matchesType;
  });

  // Get unique branches, statuses, and types for filters
  const branches = [...new Set(equipments.map((e) => e.branch))];
  const statuses = [...new Set(equipments.map((e) => e.status))];
  const types = [...new Set(equipments.map((e) => e.type))];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Operacional":
        return "default";
      case "Em Manutenção":
        return "secondary";
      case "Inativo":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Equipamentos</h2>
        <Button onClick={handleAddEquipment}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Equipamento
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, número de série ou responsável..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Filtros:</span>
          </div>

          <Select value={branchFilter} onValueChange={setBranchFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filial" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>Lista de equipamentos informáticos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Nº de Série</TableHead>
              <TableHead>Filial</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Última Manutenção</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEquipments.length > 0 ? (
              filteredEquipments.map((equipment) => (
                <TableRow key={equipment.id}>
                  <TableCell className="font-medium">
                    {equipment.name}
                  </TableCell>
                  <TableCell>{equipment.type}</TableCell>
                  <TableCell>{equipment.serialNumber}</TableCell>
                  <TableCell>{equipment.branch}</TableCell>
                  <TableCell>{equipment.responsible}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(equipment.status)}>
                      {equipment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(equipment.lastMaintenance).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewEquipment(equipment.id)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditEquipment(equipment.id)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteEquipment(equipment.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  Nenhum equipamento encontrado com os filtros aplicados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EquipmentList;
