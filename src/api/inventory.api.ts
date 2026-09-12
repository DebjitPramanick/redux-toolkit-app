import { supabase } from "../lib/supabase";
import { Inventory, InventoryUpdate } from "../types";

export const getInventory = async (shopId: number): Promise<Inventory> => {
  const { data, error } = await supabase
    .from("Inventory")
    .select("*")
    .eq("shop_id", shopId)
    .single();
  if (error) throw error;
  return data;
};

export const updateInventory = async (
  inventoryId: number,
  inventory: InventoryUpdate,
): Promise<Inventory> => {
  const { data, error } = await supabase
    .from("Inventory")
    .update(inventory)
    .eq("id", inventoryId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteInventory = async (inventoryId: number): Promise<void> => {
  const { error } = await supabase
    .from("Inventory")
    .delete()
    .eq("id", inventoryId);
  if (error) throw error;
};
