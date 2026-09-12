export default function InventorySection() {
  return (
    <section className="card inventory-card">
      <div className="card-heading">
        <div>
          <span className="section-number">04</span>
          <h3>Inventory</h3>
        </div>

        <span className="inventory-count">24 cakes</span>
      </div>

      <div className="movement-panel">
        <span className="movement-label">Add cakes</span>
        <p>Add newly produced cakes to inventory.</p>

        <div className="inline-control">
          <input type="number" min="1" placeholder="0" />

          <button className="secondary-button" type="button">
            Add Cakes
          </button>
        </div>
      </div>

      {/* Add-cakes API call and inventory state update go here. */}
    </section>
  );
}
