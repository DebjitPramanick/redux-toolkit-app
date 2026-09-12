import { supabase } from "../lib/supabase";
import { Customer, CustomerCreate, CustomerUpdate } from "../types";

export const getCustomers = async (): Promise<Customer[]> => {
  const { data, error } = await supabase.from("Customer").select("*");
  if (error) throw error;
  return data;
};

export const createCustomer = async (
  customer: CustomerCreate,
): Promise<Customer> => {
  const { data, error } = await supabase
    .from("Customer")
    .insert(customer)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateCustomer = async (
  customerId: number,
  customer: CustomerUpdate,
): Promise<Customer> => {
  const { data, error } = await supabase
    .from("Customer")
    .update(customer)
    .eq("id", customerId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteCustomer = async (customerId: number): Promise<void> => {
  const { error } = await supabase
    .from("Customer")
    .delete()
    .eq("id", customerId);
  if (error) throw error;
};
