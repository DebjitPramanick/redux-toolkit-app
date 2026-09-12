export default function TransactionSection() {
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
          <strong>Rahul Bakery</strong>
        </div>
        <div>
          <span>Shop</span>
          <strong>Cake Shop</strong>
        </div>
      </div>

      <div className="form-grid">
        <label>
          Cakes
          <input type="number" min="1" placeholder="0" />
        </label>

        <label>
          Amount
          <div className="input-prefix">
            <span>₹</span>
            <input type="number" min="0" placeholder="0.00" />
          </div>
        </label>
      </div>

      <button className="primary-button full-width" type="button">
        Create transaction
      </button>

      {/* Submit transaction, update inventory and connect customer/shop here. */}
    </section>
  );
}
