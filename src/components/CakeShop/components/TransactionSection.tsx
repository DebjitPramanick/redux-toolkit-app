import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { sellCake } from "../../../redux/slices/shops.slice";
import { SellCakePayload } from "../../../types";

const CAKE_PRICE = 100;

export default function TransactionSection() {
  const { customers, shops } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const [numberOfCakes, setNumberOfCakes] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedCustomer = customers.selectedCustomer;
  const selectedShop = shops.selectedShop;
  const saleError = shops.errorSale;

  const handleCreateTransaction = async () => {
    if (numberOfCakes <= 0) {
      return;
    }
    const totalAmount = numberOfCakes * CAKE_PRICE;
    const sellCakePayload: SellCakePayload = {
      cake_count: numberOfCakes,
      amount: totalAmount,
    };
    try {
      await dispatch(sellCake(sellCakePayload));
      setNumberOfCakes(0);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to create transaction",
      );
    }
  };

  console.log(errorMessage);

  const isLoading = shops.isProcessingSale;

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

      {(saleError || errorMessage) && (
        <div className="error-message">{saleError || errorMessage}</div>
      )}
    </section>
  );
}
