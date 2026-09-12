export default function CustomerSection() {
  return (
    <section className="card customer-card">
      <div className="card-heading">
        <div>
          <span className="section-number">01</span>
          <h3>Customers</h3>
        </div>
        <button className="ghost-button" type="button">
          + New customer
        </button>
      </div>

      <div className="form-grid">
        <label>
          Customer name
          <input type="text" placeholder="e.g. Rahul Bakery" />
        </label>
      </div>

      <div className="select-row">
        <label className="wide-field">
          Select customer
          <select defaultValue="">
            <option value="" disabled>
              Choose a customer
            </option>
            <option>Rahul Bakery</option>
            <option>Sweet Corner</option>
            <option>Daily Bakes</option>
          </select>
        </label>

        {/* Add customer / select customer functionality here. */}
        <button className="primary-button" type="button">
          Select
        </button>
      </div>
    </section>
  );
}
