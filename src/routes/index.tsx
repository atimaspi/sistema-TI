import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/components/home";
import EquipmentList from "@/components/equipment/EquipmentList";
import EquipmentForm from "@/components/equipment/EquipmentForm";
import EquipmentDetails from "@/components/equipment/EquipmentDetails";
import MaintenanceForm from "@/components/maintenance/MaintenanceForm";
import ReportSelector from "@/components/reports/ReportSelector";
import ReportViewer from "@/components/reports/ReportViewer";
import NotificationList from "@/components/notifications/NotificationList";
import SystemSettings from "@/components/settings/SystemSettings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        path: "equipamentos",
        element: <EquipmentList />,
      },
      {
        path: "equipamentos/novo",
        element: <EquipmentForm />,
      },
      {
        path: "equipamentos/:id",
        element: <EquipmentDetails />,
      },
      {
        path: "equipamentos/:id/editar",
        element: <EquipmentForm />,
      },
      {
        path: "manutencao/nova",
        element: <MaintenanceForm />,
      },
      {
        path: "relatorios",
        element: <ReportSelector />,
      },
      {
        path: "relatorios/visualizar",
        element: <ReportViewer />,
      },
      {
        path: "notificacoes",
        element: <NotificationList />,
      },
      {
        path: "configuracoes",
        element: <SystemSettings />,
      },
    ],
  },
]);

export default router;
