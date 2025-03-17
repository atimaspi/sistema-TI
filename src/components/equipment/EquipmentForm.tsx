import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, X, ArrowLeft } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  serialNumber: z.string().min(1, { message: "Número de série é obrigatório" }),
  model: z.string().min(1, { message: "Modelo é obrigatório" }),
  type: z.string().min(1, { message: "Tipo é obrigatório" }),
  manufacturer: z.string().min(1, { message: "Fabricante é obrigatório" }),
  purchaseDate: z.string().min(1, { message: "Data de compra é obrigatória" }),
  warranty: z.string().min(1, { message: "Garantia é obrigatória" }),
  location: z.string().min(1, { message: "Localização é obrigatória" }),
  department: z.string().min(1, { message: "Departamento é obrigatório" }),
  responsible: z.string().min(1, { message: "Responsável é obrigatório" }),
  status: z.string().min(1, { message: "Status é obrigatório" }),
  notes: z.string().optional(),
});

type EquipmentFormValues = z.infer<typeof formSchema>;

interface EquipmentFormProps {
  equipment?: EquipmentFormValues;
}

// Mock data for equipment by ID
const getEquipmentById = (id: string): EquipmentFormValues | null => {
  const equipments = [
    {
      id: "1",
      name: "Notebook Dell Latitude",
      serialNumber: "DL-2023-001",
      model: "Latitude 5420",
      type: "notebook",
      manufacturer: "Dell",
      purchaseDate: "2023-03-15",
      warranty: "36",
      location: "matriz",
      department: "ti",
      responsible: "João Silva",
      status: "operational",
      notes:
        "Equipamento utilizado pelo departamento de TI para desenvolvimento de software.",
    },
    {
      id: "2",
      name: "Impressora HP LaserJet",
      serialNumber: "HP-2022-045",
      model: "LaserJet Pro MFP M428fdw",
      type: "printer",
      manufacturer: "HP",
      purchaseDate: "2022-08-10",
      warranty: "24",
      location: "filial-rj",
      department: "financeiro",
      responsible: "Maria Santos",
      status: "maintenance",
      notes:
        "Impressora multifuncional utilizada pelo departamento financeiro.",
    },
  ];

  const equipment = equipments.find((eq) => eq.id === id);
  if (!equipment) return null;

  // Remove id from the returned object
  const { id: _, ...equipmentData } = equipment;
  return equipmentData as EquipmentFormValues;
};

const EquipmentForm = ({ equipment }: EquipmentFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const defaultValues = {
    name: "",
    serialNumber: "",
    model: "",
    type: "",
    manufacturer: "",
    purchaseDate: "",
    warranty: "",
    location: "",
    department: "",
    responsible: "",
    status: "operational",
    notes: "",
  };

  const form = useForm<EquipmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: equipment || defaultValues,
  });

  // If editing, load equipment data
  useEffect(() => {
    if (id) {
      const equipmentData = getEquipmentById(id);
      if (equipmentData) {
        Object.keys(equipmentData).forEach((key) => {
          form.setValue(
            key as keyof EquipmentFormValues,
            equipmentData[key as keyof EquipmentFormValues],
          );
        });
      }
    }
  }, [id, form]);

  const handleSubmit = (data: EquipmentFormValues) => {
    console.log("Form submitted:", data);
    // In a real application, this would save the data to the backend
    navigate("/app/equipamentos");
  };

  const handleCancel = () => {
    navigate("/app/equipamentos");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-md">
      <CardHeader className="flex flex-row items-center">
        <Button variant="ghost" className="mr-2" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <CardTitle className="text-2xl font-bold text-gray-800">
          {id ? "Editar Equipamento" : "Cadastrar Novo Equipamento"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Equipamento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Notebook Dell XPS" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Série</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: SN12345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: XPS 15 9500" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de equipamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="notebook">Notebook</SelectItem>
                        <SelectItem value="desktop">Desktop</SelectItem>
                        <SelectItem value="monitor">Monitor</SelectItem>
                        <SelectItem value="printer">Impressora</SelectItem>
                        <SelectItem value="server">Servidor</SelectItem>
                        <SelectItem value="network">
                          Equipamento de Rede
                        </SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fabricante</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Dell" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="purchaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Compra</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="warranty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Garantia (meses)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 24" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filial/Localização</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a filial" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="matriz">
                          Matriz - São Paulo
                        </SelectItem>
                        <SelectItem value="filial-rj">
                          Filial - Rio de Janeiro
                        </SelectItem>
                        <SelectItem value="filial-bh">
                          Filial - Belo Horizonte
                        </SelectItem>
                        <SelectItem value="filial-rs">
                          Filial - Porto Alegre
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o departamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ti">TI</SelectItem>
                        <SelectItem value="rh">Recursos Humanos</SelectItem>
                        <SelectItem value="financeiro">Financeiro</SelectItem>
                        <SelectItem value="comercial">Comercial</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="operacoes">Operações</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="responsible"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsável</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: João Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="operational">Operacional</SelectItem>
                        <SelectItem value="maintenance">
                          Em Manutenção
                        </SelectItem>
                        <SelectItem value="reserved">Reservado</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                        <SelectItem value="defective">Defeituoso</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Informações adicionais sobre o equipamento..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Adicione informações relevantes como configurações
                    específicas, problemas conhecidos ou histórico de uso.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex justify-end gap-4 px-0">
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" /> Cancelar
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Salvar
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EquipmentForm;
