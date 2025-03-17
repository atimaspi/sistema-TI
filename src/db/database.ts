import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.",
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Equipment related functions
export async function getEquipments() {
  const { data, error } = await supabase.from("equipment").select(`
      *,
      equipment_types(name),
      branches(name),
      departments(name),
      users(name)
    `);

  if (error) {
    console.error("Error fetching equipment:", error);
    return [];
  }

  return data;
}

export async function getEquipmentById(id: string) {
  const { data, error } = await supabase
    .from("equipment")
    .select(
      `
      *,
      equipment_types(name),
      branches(name),
      departments(name),
      users(name),
      maintenance_records(*)
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching equipment with id ${id}:`, error);
    return null;
  }

  return data;
}

export async function createEquipment(equipment: any) {
  const { data, error } = await supabase
    .from("equipment")
    .insert(equipment)
    .select();

  if (error) {
    console.error("Error creating equipment:", error);
    return null;
  }

  return data[0];
}

export async function updateEquipment(id: string, equipment: any) {
  const { data, error } = await supabase
    .from("equipment")
    .update(equipment)
    .eq("id", id)
    .select();

  if (error) {
    console.error(`Error updating equipment with id ${id}:`, error);
    return null;
  }

  return data[0];
}

export async function deleteEquipment(id: string) {
  const { error } = await supabase.from("equipment").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting equipment with id ${id}:`, error);
    return false;
  }

  return true;
}

// Maintenance related functions
export async function createMaintenanceRecord(record: any) {
  const { data, error } = await supabase
    .from("maintenance_records")
    .insert(record)
    .select();

  if (error) {
    console.error("Error creating maintenance record:", error);
    return null;
  }

  return data[0];
}

export async function getMaintenanceRecords(equipmentId?: string) {
  let query = supabase.from("maintenance_records").select(`
      *,
      equipment(name, serial_number),
      users(name)
    `);

  if (equipmentId) {
    query = query.eq("equipment_id", equipmentId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching maintenance records:", error);
    return [];
  }

  return data;
}

// Notification related functions
export async function getNotifications() {
  const { data, error } = await supabase
    .from("notifications")
    .select(
      `
      *,
      equipment(name, serial_number),
      branches(name)
    `,
    )
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }

  return data;
}

// Branch and department related functions
export async function getBranches() {
  const { data, error } = await supabase.from("branches").select("*");

  if (error) {
    console.error("Error fetching branches:", error);
    return [];
  }

  return data;
}

export async function getDepartments(branchId?: string) {
  let query = supabase.from("departments").select("*");

  if (branchId) {
    query = query.eq("branch_id", branchId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching departments:", error);
    return [];
  }

  return data;
}

// User related functions
export async function getUsers() {
  const { data, error } = await supabase.from("users").select(`
      *,
      branches(name),
      departments(name)
    `);

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data;
}

// Equipment types related functions
export async function getEquipmentTypes() {
  const { data, error } = await supabase.from("equipment_types").select("*");

  if (error) {
    console.error("Error fetching equipment types:", error);
    return [];
  }

  return data;
}

// Alert rules related functions
export async function getAlertRules() {
  const { data, error } = await supabase.from("alert_rules").select("*");

  if (error) {
    console.error("Error fetching alert rules:", error);
    return [];
  }

  return data;
}
