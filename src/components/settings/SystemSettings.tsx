import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus, Edit, Trash2, Save, Building, Users, Bell } from "lucide-react";

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  manager: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  branch: string;
}

interface AlertRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  type: string;
  condition: string;
}

const SystemSettings = () => {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: "1",
      name: "Filial Central",
      address: "Av. Principal, 1000",
      phone: "(11) 3333-4444",
      manager: "Carlos Silva",
    },
    {
      id: "2",
      name: "Filial Norte",
      address: "Rua das Flores, 250",
      phone: "(11) 5555-6666",
      manager: "Ana Oliveira",
    },
    {
      id: "3",
      name: "Filial Sul",
      address: "Av. das Nações, 789",
      phone: "(11) 7777-8888",
      manager: "Roberto Santos",
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Carlos Silva",
      email: "carlos.silva@empresa.com",
      role: "Gerente",
      branch: "Filial Central",
    },
    {
      id: "2",
      name: "Ana Oliveira",
      email: "ana.oliveira@empresa.com",
      role: "Gerente",
      branch: "Filial Norte",
    },
    {
      id: "3",
      name: "Roberto Santos",
      email: "roberto.santos@empresa.com",
      role: "Gerente",
      branch: "Filial Sul",
    },
    {
      id: "4",
      name: "Juliana Costa",
      email: "juliana.costa@empresa.com",
      role: "Técnico",
      branch: "Filial Central",
    },
    {
      id: "5",
      name: "Marcos Pereira",
      email: "marcos.pereira@empresa.com",
      role: "Técnico",
      branch: "Filial Norte",
    },
  ]);

  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: "1",
      name: "Manutenção Preventiva",
      description:
        "Alerta para equipamentos que precisam de manutenção preventiva",
      enabled: true,
      type: "Manutenção",
      condition: "Último serviço > 90 dias",
    },
    {
      id: "2",
      name: "Garantia Expirando",
      description:
        "Alerta para equipamentos com garantia próxima do vencimento",
      enabled: true,
      type: "Garantia",
      condition: "Garantia < 30 dias",
    },
    {
      id: "3",
      name: "Equipamento Inativo",
      description: "Alerta para equipamentos sem uso por período prolongado",
      enabled: false,
      type: "Utilização",
      condition: "Sem uso > 60 dias",
    },
  ]);

  const [showBranchDialog, setShowBranchDialog] = useState(true);
  const [showUserDialog, setShowUserDialog] = useState(true);
  const [showAlertDialog, setShowAlertDialog] = useState(true);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Configurações do Sistema
        </h1>
        <p className="text-gray-500 mt-2">
          Gerencie filiais, usuários e configurações de alertas do sistema
        </p>
      </div>

      <Tabs defaultValue="branches" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="branches" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Filiais
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Alertas
          </TabsTrigger>
        </TabsList>

        {/* Filiais Tab */}
        <TabsContent value="branches">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Gerenciamento de Filiais</CardTitle>
                <CardDescription>
                  Adicione, edite ou remova filiais da empresa
                </CardDescription>
              </div>
              <Dialog
                open={showBranchDialog}
                onOpenChange={setShowBranchDialog}
              >
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Nova Filial
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Nova Filial</DialogTitle>
                    <DialogDescription>
                      Preencha os dados da nova filial
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="branch-name" className="text-right">
                        Nome
                      </Label>
                      <Input
                        id="branch-name"
                        className="col-span-3"
                        placeholder="Nome da filial"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="branch-address" className="text-right">
                        Endereço
                      </Label>
                      <Input
                        id="branch-address"
                        className="col-span-3"
                        placeholder="Endereço completo"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="branch-phone" className="text-right">
                        Telefone
                      </Label>
                      <Input
                        id="branch-phone"
                        className="col-span-3"
                        placeholder="(00) 0000-0000"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="branch-manager" className="text-right">
                        Gerente
                      </Label>
                      <Input
                        id="branch-manager"
                        className="col-span-3"
                        placeholder="Nome do gerente responsável"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Salvar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Gerente</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {branches.map((branch) => (
                    <TableRow key={branch.id}>
                      <TableCell className="font-medium">
                        {branch.name}
                      </TableCell>
                      <TableCell>{branch.address}</TableCell>
                      <TableCell>{branch.phone}</TableCell>
                      <TableCell>{branch.manager}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usuários Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
                <CardDescription>
                  Adicione, edite ou remova usuários do sistema
                </CardDescription>
              </div>
              <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Novo Usuário
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                    <DialogDescription>
                      Preencha os dados do novo usuário
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="user-name" className="text-right">
                        Nome
                      </Label>
                      <Input
                        id="user-name"
                        className="col-span-3"
                        placeholder="Nome completo"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="user-email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="user-email"
                        className="col-span-3"
                        type="email"
                        placeholder="email@empresa.com"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="user-role" className="text-right">
                        Função
                      </Label>
                      <Input
                        id="user-role"
                        className="col-span-3"
                        placeholder="Cargo ou função"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="user-branch" className="text-right">
                        Filial
                      </Label>
                      <Input
                        id="user-branch"
                        className="col-span-3"
                        placeholder="Filial de atuação"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Salvar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Filial</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.branch}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alertas Tab */}
        <TabsContent value="alerts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Configuração de Alertas</CardTitle>
                <CardDescription>
                  Defina regras para notificações automáticas do sistema
                </CardDescription>
              </div>
              <Dialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Nova Regra
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Nova Regra de Alerta</DialogTitle>
                    <DialogDescription>
                      Configure uma nova regra para notificações
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="alert-name" className="text-right">
                        Nome
                      </Label>
                      <Input
                        id="alert-name"
                        className="col-span-3"
                        placeholder="Nome da regra"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="alert-description" className="text-right">
                        Descrição
                      </Label>
                      <Input
                        id="alert-description"
                        className="col-span-3"
                        placeholder="Descrição da regra"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="alert-type" className="text-right">
                        Tipo
                      </Label>
                      <Input
                        id="alert-type"
                        className="col-span-3"
                        placeholder="Tipo de alerta"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="alert-condition" className="text-right">
                        Condição
                      </Label>
                      <Input
                        id="alert-condition"
                        className="col-span-3"
                        placeholder="Condição para disparo"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="alert-enabled" className="text-right">
                        Ativo
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="alert-enabled" />
                        <Label htmlFor="alert-enabled">Ativar esta regra</Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Salvar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Condição</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alertRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>{rule.description}</TableCell>
                      <TableCell>{rule.type}</TableCell>
                      <TableCell>{rule.condition}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Switch
                            id={`rule-${rule.id}`}
                            checked={rule.enabled}
                          />
                          <Label htmlFor={`rule-${rule.id}`} className="ml-2">
                            {rule.enabled ? "Ativo" : "Inativo"}
                          </Label>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">
                Total de regras: {alertRules.length}
              </p>
              <Button variant="outline" className="flex items-center gap-2">
                <Save className="h-4 w-4" /> Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
