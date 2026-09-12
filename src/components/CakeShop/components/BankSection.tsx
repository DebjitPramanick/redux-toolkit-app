import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchBank } from "../../../redux/slices/bank.slice";
import { fetchTransactions } from "../../../redux/slices/transactions.slice";

export default function BankSection() {
  const { selectedShop } = useAppSelector((state) => state.shops);
  const dispatch = useAppDispatch();

  const {
    data: bank,
    isLoading: isBankLoading,
    error: bankError,
  } = useAppSelector((state) => state.bank);

  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    error: transactionsError,
  } = useAppSelector((state) => state.transactions);

  useEffect(() => {
    if (selectedShop) {
      dispatch(fetchBank(selectedShop.id));
      dispatch(fetchTransactions(selectedShop.id));
    }
  }, [selectedShop]);

  const latestTransaction = transactions?.[0];

  return (
    <section className="card bank-card">
      <div className="card-heading">
        <div>
          <span className="section-number">03</span>
          <h3>Bank</h3>
        </div>
        <span className="soft-badge">Overview</span>
      </div>

      <div className="bank-balance">
        <span>Available balance</span>
        <strong>
          {isBankLoading ? "Loading..." : `₹ ${bank?.balance ?? 0}`}
        </strong>
      </div>

      <div className="bank-grid">
        <div>
          <span>Last transaction</span>
          <strong>
            {isTransactionsLoading
              ? "Loading..."
              : `₹ ${latestTransaction?.amount ?? 0}`}
          </strong>
        </div>
      </div>
    </section>
  );
}
