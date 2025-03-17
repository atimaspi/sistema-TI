import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import EquipmentOverview from "./dashboard/EquipmentOverview";
import MaintenanceStatus from "./dashboard/MaintenanceStatus";
import ActiveAlerts from "./dashboard/ActiveAlerts";

const Home = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title="Dashboard" />

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Equipment Overview Section */}
            <EquipmentOverview />

            {/* Maintenance Status and Active Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MaintenanceStatus />
              <ActiveAlerts />
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Ações Rápidas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <QuickActionCard
                  title="Adicionar Equipamento"
                  description="Cadastrar novo equipamento no sistema"
                  icon="📋"
                  link="/app/equipamentos/novo"
                />
                <QuickActionCard
                  title="Registrar Manutenção"
                  description="Adicionar registro de manutenção"
                  icon="🔧"
                  link="/app/manutencao/nova"
                />
                <QuickActionCard
                  title="Gerar Relatório"
                  description="Criar relatório personalizado"
                  icon="📊"
                  link="/app/relatorios"
                />
                <QuickActionCard
                  title="Configurar Alertas"
                  description="Gerenciar regras de notificação"
                  icon="🔔"
                  link="/app/configuracoes"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

const QuickActionCard = ({
  title = "Ação",
  description = "Descrição da ação",
  icon = "📄",
  link = "/",
}: QuickActionCardProps) => {
  return (
    <Link
      to={link}
      className="block p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-200 transition-colors"
    >
      <div className="flex items-start">
        <div className="text-2xl mr-3">{icon}</div>
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Home;
