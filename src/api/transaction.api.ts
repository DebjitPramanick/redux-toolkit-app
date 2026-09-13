import { supabase } from "../lib/supabase";
import { Transaction, TransactionCreate } from "../types";

export const getTransactions = async (
  shopId: number,
): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from("Transaction")
    .select(
      `*,  
      customer: Customer (
        id,
        name
      ),
      shop:Shop (
        id,
        name
      )`,
    )
    .eq("shop_id", shopId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const createTransaction = async (
  transaction: TransactionCreate,
): Promise<Transaction> => {
  const { data, error } = await supabase
    .from("Transaction")
    .insert(transaction)
    .select(
      `
      *,
      customer: Customer (
        id,
        name
      ),
      shop:Shop (
        id,
        name
      )`,
    )
    .single();
  if (error) throw error;
  return data;
};
