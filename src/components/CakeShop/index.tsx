import CustomerSection from "./components/CustomerSection";
import InventorySection from "./components/InventorySection";
import TransactionSection from "./components/TransactionSection";
import BankSection from "./components/BankSection";
import "./index.css";

const CakeShop = () => {
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
          <div className="hero-stat">
            <strong>24</strong>
            <span>Cakes in inventory</span>
          </div>
        </section>

        <div className="dashboard-grid">
          <CustomerSection />
          <TransactionSection />
          <div className="column-grid">
            <BankSection />
            <InventorySection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CakeShop;
