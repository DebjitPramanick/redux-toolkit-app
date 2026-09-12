import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchInventory,
  modifyInventory,
} from "../../../redux/slices/inventory.slice";
import { BankUpdate, InventoryUpdate } from "../../../types";
import { modifyBank } from "../../../redux/slices/bank.slice";

const INVENTORY_CAKE_PRICE = 80;

export default function InventorySection() {
  const dispatch = useAppDispatch();
  const { inventory, bank } = useAppSelector((state) => state);
  const { selectedShop } = useAppSelector((state) => state.shops);

  const [numberOfCakes, setNumberOfCakes] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const currentInventory = inventory.data;

  const handleAddCakesToInventory = async () => {
    if (!currentInventory || numberOfCakes <= 0) return;
    const totalInvestment = numberOfCakes * INVENTORY_CAKE_PRICE;
    const newInventory: InventoryUpdate = {
      cake_count: (currentInventory?.cake_count ?? 0) + numberOfCakes,
    };
    const newBank: BankUpdate = {
      balance: (bank.data?.balance ?? 0) - totalInvestment,
    };
    try {
      await dispatch(modifyInventory([currentInventory.id, newInventory]));
      await dispatch(modifyBank([bank.data?.id, newBank]));
      setNumberOfCakes(0);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to add cakes to inventory",
      );
    }
  };

  useEffect(() => {
    if (selectedShop) {
      dispatch(fetchInventory(selectedShop.id));
    }
  }, [dispatch, selectedShop]);

  return (
    <section className="card inventory-card">
      <div className="card-heading">
        <div>
          <span className="section-number">04</span>
          <h3>Inventory</h3>
        </div>

        <span className="inventory-count">
          {inventory.isLoading
            ? "Loading..."
            : `${currentInventory?.cake_count ?? 0} cakes`}
        </span>
      </div>

      <div className="movement-panel">
        <span className="movement-label">Add cakes</span>
        <p>Add newly produced cakes to inventory.</p>

        <div className="inline-control">
          <input
            type="number"
            min="1"
            placeholder="0"
            value={numberOfCakes}
            onChange={(e) => setNumberOfCakes(Number(e.target.value))}
          />

          <button
            className="secondary-button"
            type="button"
            onClick={handleAddCakesToInventory}
          >
            Add Cakes
          </button>
        </div>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </section>
  );
}
