// Database schema types for the IT Equipment Management System

export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string;
  manager: string;
  createdAt: string;
  updatedAt: string;
};

export type Department = {
  id: string;
  name: string;
  branchId: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "technician" | "user";
  branchId: string;
  departmentId: string;
  createdAt: string;
  updatedAt: string;
};

export type EquipmentType = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Equipment = {
  id: string;
  name: string;
  serialNumber: string;
  model: string;
  typeId: string;
  manufacturer: string;
  purchaseDate: string;
  warranty: number; // in months
  locationId: string;
  departmentId: string;
  responsibleId: string;
  status: "operational" | "maintenance" | "reserved" | "inactive" | "defective";
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type MaintenanceRecord = {
  id: string;
  equipmentId: string;
  maintenanceType: "preventive" | "corrective" | "predictive" | "upgrade";
  description: string;
  date: string;
  technicianId: string;
  status: "pending" | "in_progress" | "completed";
  cost: number;
  createdAt: string;
  updatedAt: string;
};

export type Notification = {
  id: string;
  title: string;
  description: string;
  type: "maintenance" | "problem" | "alert";
  status: "pending" | "in_progress" | "resolved";
  priority: "high" | "medium" | "low";
  date: string;
  equipmentId: string;
  locationId: string;
  createdAt: string;
  updatedAt: string;
};

export type AlertRule = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  type: string;
  condition: string;
  createdAt: string;
  updatedAt: string;
};
