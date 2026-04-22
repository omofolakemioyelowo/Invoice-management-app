import StatusBadge from "./shared/StatusBadge.jsx";
import "./InvoiceCard.css";

export default function InvoiceCard({ invoice, onClick }) {
  return (
    <div className="invoice-card" onClick={onClick}>
      <div className="inv-left">
        <h4 className="inv-id">
          <span>#</span>{invoice.id}
        </h4>
        <p className="inv-due">Due {invoice.paymentDue}</p>
        <p className="inv-client">{invoice.clientAddress.name}</p>
      </div>
      <div className="inv-right">
        <h3 className="inv-amt">£{invoice.total.toLocaleString()}</h3>
        <StatusBadge status={invoice.status} />
        <div className="arrow-icon">
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
}
