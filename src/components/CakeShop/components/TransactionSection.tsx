import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  BankUpdate,
  InventoryUpdate,
  TransactionCreate,
  TransactionType,
} from "../../../types";
import {
  addTransaction,
  fetchTransactions,
} from "../../../redux/slices/transactions.slice";
import { fetchBank, modifyBank } from "../../../redux/slices/bank.slice";
import {
  fetchInventory,
  modifyInventory,
} from "../../../redux/slices/inventory.slice";

const CAKE_PRICE = 100;

const TRANSACTION_TYPES: Record<string, TransactionType> = {
  DEPOSIT: "deposit",
  WITHDRAWAL: "withdrawal",
};

export default function TransactionSection() {
  const { bank, customers, shops, inventory, transactions } = useAppSelector(
    (state) => state,
  );

  const dispatch = useAppDispatch();

  const [numberOfCakes, setNumberOfCakes] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedCustomer = customers.selectedCustomer;
  const selectedShop = shops.selectedShop;
  const selectedBank = bank.data;
  const selectedInventory = inventory.data;

  const handleCreateTransaction = async () => {
    if (!selectedShop?.id || !selectedCustomer?.id || !selectedBank?.id) {
      return;
    }
    const newInventory: InventoryUpdate = {
      cake_count: (selectedInventory?.cake_count ?? 0) - numberOfCakes,
    };
    const newBank: BankUpdate = {
      balance: (bank.data?.balance ?? 0) + totalAmount,
    };
    const newTransaction: TransactionCreate = {
      shop_id: selectedShop?.id,
      customer_id: selectedCustomer?.id,
      bank_id: selectedBank?.id,
      type: TRANSACTION_TYPES.DEPOSIT,
      amount: totalAmount,
    };
    console.log(newInventory, newBank, newTransaction);
    try {
      await dispatch(modifyInventory([selectedShop?.id, newInventory]));
      await dispatch(modifyBank([bank.data?.id, newBank]));
      await dispatch(addTransaction(newTransaction));
      setNumberOfCakes(0);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to create transaction",
      );
    }
  };

  const isLoading =
    inventory.isLoading || bank.isLoading || transactions.isLoading;

  const totalAmount = numberOfCakes * CAKE_PRICE;

  return (
    <section className="card transaction-card">
      <div className="card-heading">
        <div>
          <span className="section-number">02</span>
          <h3>Transaction</h3>
        </div>
        <span className="soft-badge">New</span>
      </div>

      <div className="transaction-summary">
        <div>
          <span>Customer</span>
          <strong>{selectedCustomer?.name ?? "--"}</strong>
        </div>
        <div>
          <span>Shop</span>
          <strong>{selectedShop?.name ?? "--"}</strong>
        </div>
      </div>

      <div className="form-grid">
        <label>
          Cakes
          <input
            type="number"
            min="1"
            placeholder="0"
            value={numberOfCakes}
            onChange={(e) => setNumberOfCakes(Number(e.target.value))}
          />
        </label>

        <div className="amount-display">Total: {totalAmount}</div>
      </div>

      <button
        className="primary-button full-width"
        type="button"
        onClick={handleCreateTransaction}
        disabled={isLoading}
      >
        {isLoading ? "Creating transaction..." : "Create transaction"}
      </button>
    </section>
  );
}
