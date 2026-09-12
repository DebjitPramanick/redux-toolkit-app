import CustomerSection from "./components/CustomerSection";
import InventorySection from "./components/InventorySection";
import TransactionSection from "./components/TransactionSection";
import BankSection from "./components/BankSection";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useMemo } from "react";
import { fetchShops, selectShop } from "../../redux/slices/shops.slice";

const CakeShop = () => {
  const dispatch = useAppDispatch();
  const {
    data: shops,
    selectedShop,
    isLoading,
    error,
  } = useAppSelector((state) => state.shops);

  const defaultSelectedShop = useMemo(() => {
    return shops?.[0];
  }, [shops]);

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  useEffect(() => {
    if (defaultSelectedShop) {
      dispatch(selectShop(defaultSelectedShop));
    }
  }, [shops]);

  const shopOptions = useMemo(() => {
    const options = [
      {
        label: "Choose a shop",
        value: "",
        disabled: true,
      },
      ...shops?.map((shop) => ({
        label: shop.name,
        value: shop.id,
        disabled: false,
      })),
    ];

    return options;
  }, [shops]);

  const handleSelectShop = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const shop = shops?.find((shop) => shop.id === Number(e.target.value));
    if (!shop) return;
    dispatch(selectShop(shop));
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">CAKE OPERATIONS</p>
          <h1>Cake Inventory</h1>
        </div>

        <div className="topbar-meta">
          <span className="status-dot" />
          <span>Ready</span>
        </div>
      </header>

      <main className="page">
        <section className="hero">
          <div>
            <span className="hero-kicker">Daily workspace</span>
            <h2>Manage your cake business in one place.</h2>
            <p>
              Customers, shops, inventory movement, transactions and bank
              activity — kept simple.
            </p>
          </div>
          <div className="shop-selector">
            <label htmlFor="shop-select">Select shop</label>
            <select
              defaultValue={defaultSelectedShop?.id}
              id="shop-select"
              onChange={handleSelectShop}
            >
              {shopOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        {selectedShop ? (
          <div className="dashboard-grid">
            <CustomerSection />
            <TransactionSection />
            <div className="column-grid">
              <BankSection />
              <InventorySection />
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <h4>No shop selected</h4>
            <p>Please select a shop to continue</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CakeShop;
