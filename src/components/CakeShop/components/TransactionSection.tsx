import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { sellCake } from "../../../redux/slices/shops.slice";
import { SellCakePayload } from "../../../types";
import { selectTransactions } from "../../../redux/slices/transactions.slice";

const CAKE_PRICE = 100;

export default function TransactionSection() {
  const { customers, shops } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const [numberOfCakes, setNumberOfCakes] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    customerQuery?: string;
    amountRange?: [number | null, number | null];
  }>({});

  const selectedCustomer = customers.selectedCustomer;
  const selectedShop = shops.selectedShop;
  const saleError = shops.errorSale;

  const transactions = useAppSelector((state) =>
    selectTransactions(state, filters),
  );

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

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => {
      return {
        ...prev,
        customerQuery: e.target.value,
      };
    });
  };

  const handleAmountChange = (
    type: "min" | "max",
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(e.target.value);

    setFilters((prev) => {
      const [min, max] = prev.amountRange ?? [0, 0];
      return {
        ...prev,
        amountRange: type === "min" ? [value, max] : [min, value],
      };
    });
  };

  const handleClearFilters = () => {
    setFilters({
      customerQuery: "",
      amountRange: [null, null],
    });
  };

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

      <p className="transaction-count">
        Transactions found: {transactions.length}
      </p>

      <div className="transaction-filters">
        <div className="filter-group customer-filter">
          <label htmlFor="customer">Customer</label>
          <input
            id="customer"
            type="text"
            placeholder="Search customer"
            name="customerQuery"
            value={filters.customerQuery}
            onChange={handleCustomerChange}
          />
        </div>

        <div className="filter-group amount-filter">
          <label>Amount Range</label>

          <div className="amount-inputs">
            <input
              type="number"
              placeholder="Min"
              min="0"
              name="amountRange"
              value={filters.amountRange?.[0] ?? undefined}
              onChange={(e) => handleAmountChange("min", e)}
            />

            <span>–</span>

            <input
              type="number"
              placeholder="Max"
              min="0"
              name="amountRange"
              value={filters.amountRange?.[1] ?? undefined}
              onChange={(e) => handleAmountChange("max", e)}
            />
          </div>
        </div>

        <button
          className="clear-button"
          type="button"
          onClick={handleClearFilters}
        >
          Clear
        </button>
      </div>

      {/* Transaction list */}
      <div className="transaction-list">
        {transactions.length === 0 ? (
          <div className="empty-transactions">
            <span>No transactions found</span>
            <small>Try changing the filters.</small>
          </div>
        ) : (
          transactions.map((transaction, index) => (
            <div className="transaction-item" key={index}>
              <div className="transaction-main">
                <div className="transaction-customer">
                  {transaction.customer.name || "Unknown customer"}
                </div>

                <div className="transaction-meta">
                  <span>
                    {new Date(transaction.created_at).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>

              <div className={`transaction-amount ${transaction.type}`}>
                ₹ {transaction.amount.toLocaleString("en-IN")}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
