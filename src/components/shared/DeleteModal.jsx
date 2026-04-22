import React from "react";
import "./DeleteModal.css";
export default function DeleteModal({ invoiceId, onDelete, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete invoice #{invoiceId}? This action
          cannot be undone.
        </p>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-delete" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
