import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./InvoiceDetail.css";
import StatusBadge from "../components/shared/StatusBadge";
import DeleteModal from "../components/shared/DeleteModal";

export default function InvoiceDetail({ invoices, onDelete, onMarkAsPaid, onEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const invoice = invoices.find(inv => inv.id === id);

  if (!invoice) {
    return (
      <div className="invoice-detail-container">
        <button className="go-back-btn" onClick={() => navigate("/")}>
          <i className="fa-solid fa-chevron-left"></i>
          <span>Go back</span>
        </button>
        <p>Invoice not found</p>
      </div>
    );
  }

  const handleDeleteConfirm = () => {
    onDelete(invoice.id);
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    onEdit(invoice);
  };

  const handleMarkAsPaid = () => {
    onMarkAsPaid(invoice.id);
  };

  return (
    <div className="invoice-detail-container">
      <button className="go-back-btn" onClick={() => navigate("/")}>
        <i className="fa-solid fa-chevron-left"></i>
        <span>Go back</span>
      </button>

      <header className="invoice-header">
        <div className="header-left">
          <span>Status</span>
          <StatusBadge status={invoice.status} />
        </div>
        <div className="header-right">
          <button className="action-btn edit" onClick={handleEdit}>Edit</button>
          <button className="action-btn delete" onClick={() => setShowDeleteModal(true)}>Delete</button>
          {invoice.status !== "paid" && (
            <button className="action-btn mark-paid" onClick={handleMarkAsPaid}>Mark as Paid</button>
          )}
        </div>
      </header>

      {/* Sticky bottom bar for mobile */}
      <div className="mobile-actions" style={{ display: "none" }}>
        <button className="action-btn edit" onClick={handleEdit}>Edit</button>
        <button className="action-btn delete" onClick={() => setShowDeleteModal(true)}>Delete</button>
        {invoice.status !== "paid" && (
          <button className="action-btn mark-paid" onClick={handleMarkAsPaid}>Mark as Paid</button>
        )}
      </div>

      <div className="invoice-body">
        <div className="body-top">
          <div className="body-top-left">
            <h3 className="invoice-id">
              <span>#</span>{invoice.id}
            </h3>
            <p className="invoice-desc">{invoice.description}</p>
          </div>
          <div className="body-top-right sender-address">
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </div>
        </div>

        <div className="body-middle">
          <div className="date-wrapper">
            <div className="date-block">
              <p className="label">Invoice Date</p>
              <h4 className="value">{invoice.createdAt}</h4>
            </div>
            <div className="date-block">
              <p className="label">Payment Due</p>
              <h4 className="value">{invoice.paymentDue}</h4>
            </div>
          </div>

          <div className="bill-to">
            <p className="label">Bill To</p>
            <h4 className="value">{invoice.clientAddress.name}</h4>
            <div className="client-address">
              <p>{invoice.clientAddress.street}</p>
              <p>{invoice.clientAddress.city}</p>
              <p>{invoice.clientAddress.postCode}</p>
              <p>{invoice.clientAddress.country}</p>
            </div>
          </div>

          <div className="sent-to">
            <p className="label">Sent to</p>
            <h4 className="value">{invoice.clientAddress.email}</h4>
          </div>
        </div>

        <div className="item-list-container">
          <div className="item-list-wrapper">
            <table className="item-list">
              <thead>
                <tr>
                  <th className="text-left">Item Name</th>
                  <th className="text-center">QTY.</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="item-name text-left">{item.name}</td>
                    <td className="item-qty text-center">{item.quantity}</td>
                    <td className="item-price text-right">£ {item.price.toFixed(2)}</td>
                    <td className="item-total text-right">£ {(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="amount-due-footer">
            <p>Amount Due</p>
            <h2>£ {invoice.total.toFixed(2)}</h2>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteModal 
          invoiceId={invoice.id} 
          onDelete={handleDeleteConfirm} 
          onCancel={() => setShowDeleteModal(false)} 
        />
      )}
    </div>
  );
}
