import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, CheckCircle, Clock, Wrench, User } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  maintenanceType: z.string({
    required_error: "Por favor selecione um tipo de manutenção",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres",
  }),
  date: z.date({
    required_error: "Por favor selecione uma data",
  }),
  technician: z.string({
    required_error: "Por favor informe o técnico responsável",
  }),
  status: z.string({
    required_error: "Por favor selecione um status",
  }),
  cost: z.string().optional(),
});

interface MaintenanceFormProps {
  equipmentId?: string;
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
  onCancel?: () => void;
  isOpen?: boolean;
}

const MaintenanceForm = ({
  equipmentId = "EQ-001",
  onSubmit = () => {},
  onCancel = () => {},
  isOpen = true,
}: MaintenanceFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maintenanceType: "",
      description: "",
      date: new Date(),
      technician: "",
      status: "pendente",
      cost: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // Aqui seria feita a integração com a API
    console.log("Dados do formulário:", data);
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Registrar Manutenção
        </h2>
        <p className="text-gray-600">Equipamento ID: {equipmentId}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo de Manutenção */}
            <FormField
              control={form.control}
              name="maintenanceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Manutenção</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="preventiva">Preventiva</SelectItem>
                      <SelectItem value="corretiva">Corretiva</SelectItem>
                      <SelectItem value="preditiva">Preditiva</SelectItem>
                      <SelectItem value="upgrade">Upgrade</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecione o tipo de manutenção a ser realizada
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Data */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Data prevista para a manutenção
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Técnico Responsável */}
            <FormField
              control={form.control}
              name="technician"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Técnico Responsável</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        className="pl-9"
                        placeholder="Nome do técnico"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Nome do técnico responsável pela manutenção
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
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
                      <SelectItem value="pendente">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                          <span>Pendente</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="em_andamento">
                        <div className="flex items-center">
                          <Wrench className="mr-2 h-4 w-4 text-blue-500" />
                          <span>Em Andamento</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="concluido">
                        <div className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          <span>Concluído</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Status atual da manutenção</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Custo */}
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custo (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0,00" {...field} />
                  </FormControl>
                  <FormDescription>
                    Custo estimado ou real da manutenção (opcional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Descrição */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva detalhadamente o serviço de manutenção a ser realizado..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Forneça detalhes sobre o problema ou procedimento de
                  manutenção
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Manutenção</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MaintenanceForm;
