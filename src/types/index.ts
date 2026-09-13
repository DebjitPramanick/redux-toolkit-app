export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export type Shop = {
  id: number;
  name: string;
};

export type ShopCreate = {
  name: string;
};

export type ShopUpdate = {
  name: string;
};

export type Customer = {
  id: number;
  name: string;
};

export type CustomerCreate = {
  name: string;
};

export type CustomerUpdate = {
  name: string;
};

export type Inventory = {
  id: number;
  shop_id: number;
  cake_count: number;
};

export type InventoryCreate = {
  shop_id: number;
  cake_count: number;
};

export type InventoryUpdate = {
  cake_count: number;
};

export type Bank = {
  id: number;
  shop_id: number;
  balance: number;
};

export type BankCreate = {
  shop_id: number;
  balance: number;
};

export type BankUpdate = {
  balance: number;
};

export type Transaction = {
  id: number;
  shop_id: number;
  customer_id: number;
  bank_id: number;
  type: string;
  amount: number;
  created_at: string;
};

export type TransactionCreate = {
  shop_id: number;
  customer_id: number;
  bank_id: number;
  type: string;
  amount: number;
};

export type TransactionType = "deposit" | "withdrawal";

export type SellCakePayload = {
  cake_count: number;
  amount: number;
};

export type StoreState = {
  todosStore: {
    todos: Todo[];
    total: number;
  };
  usersStore: {
    users: User[];
    isLoading: boolean;
    error: string | null;
  };
  customers: {
    data: Customer[];
    selectedCustomer: Customer | null;
    isLoading: boolean;
    error: string | null;
  };
  shops: {
    data: Shop[];
    selectedShop: Shop | null;
    isLoading: boolean;
    error: string | null;
    isProcessingSale: boolean;
    errorSale: string | null;
  };
  bank: {
    data: Bank;
    isLoading: boolean;
    error: string | null;
  };
  transactions: {
    data: Transaction[];
    isLoading: boolean;
    error: string | null;
  };
  inventory: {
    data: Inventory | null;
    isLoading: boolean;
    error: string | null;
  };
};
