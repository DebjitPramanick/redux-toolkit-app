import { supabase } from "../lib/supabase";
import { Bank, BankCreate, BankUpdate } from "../types";

export const getBank = async (): Promise<Bank[]> => {
  const { data, error } = await supabase.from("Bank").select("*");
  if (error) throw error;
  return data;
};

export const createBank = async (bank: BankCreate): Promise<Bank> => {
  const { data, error } = await supabase
    .from("Bank")
    .insert(bank)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateBank = async (
  bankId: number,
  bank: BankUpdate,
): Promise<Bank> => {
  const { data, error } = await supabase
    .from("Bank")
    .update(bank)
    .eq("id", bankId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteBank = async (bankId: number): Promise<void> => {
  const { error } = await supabase.from("Bank").delete().eq("id", bankId);
  if (error) throw error;
};
