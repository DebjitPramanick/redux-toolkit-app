import { supabase } from "../lib/supabase";
import { Transaction, TransactionCreate } from "../types";

export const getTransactions = async (
  shopId: number,
): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from("Transaction")
    .select("*")
    .eq("shop_id", shopId);
  if (error) throw error;
  return data;
};

export const createTransaction = async (
  transaction: TransactionCreate,
): Promise<Transaction> => {
  const { data, error } = await supabase
    .from("Transaction")
    .insert(transaction)
    .select()
    .single();
  if (error) throw error;
  return data;
};
