export default function BankSection() {
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
        <strong>₹ 1,24,500</strong>
      </div>

      <div className="bank-grid">
        <div>
          <span>Last transaction</span>
          <strong>₹ 8,400</strong>
        </div>
      </div>
      {/* Add bank transaction, fetch balance and transaction history here. */}
    </section>
  );
}
