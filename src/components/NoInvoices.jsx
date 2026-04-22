import "./NoInvoices.css";
import illustration from "../assets/illustration-empty.svg";

export default function NoInvoices() {
  return (
    <div className="empty-state">
      <img src={illustration} alt="No invoices illustration" className="empty-illustration" />
      <h2 className="empty-title">There is nothing here</h2>
      <p className="empty-desc">
        Create an invoice by clicking the <br/>
        <strong>New Invoice</strong> button and get started
      </p>
    </div>
  );
}