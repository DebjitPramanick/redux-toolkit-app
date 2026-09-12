import { supabase } from "../lib/supabase";
import { Shop, ShopCreate, ShopUpdate } from "../types";

export const getShops = async () => {
  const { data, error } = await supabase.from("Shop").select("*");
  if (error) throw error;
  return data;
};

export const createShop = async (shop: ShopCreate): Promise<Shop> => {
  const { data, error } = await supabase
    .from("Shop")
    .insert(shop)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateShop = async (
  shopId: number,
  shop: ShopUpdate,
): Promise<Shop> => {
  const { data, error } = await supabase
    .from("Shop")
    .update(shop)
    .eq("id", shopId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteShop = async (shopId: number): Promise<void> => {
  const { error } = await supabase.from("Shop").delete().eq("id", shopId);
  if (error) throw error;
};
