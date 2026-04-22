import { useState, useRef, useEffect } from "react";
import "./FilterBar.css";

export default function FilterBar({ invoiceCount, currentFilter, onFilterChange, onCreateInvoice }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterChange = (status) => {
    onFilterChange(status);
    setIsDropdownOpen(false);
  };

  const getFilterLabel = () => {
    switch (currentFilter) {
      case "draft": return "Draft";
      case "pending": return "Pending";
      case "paid": return "Paid";
      default: return "Filter by status";
    }
  };

  const getStatusLabel = () => {
    return currentFilter === "all" 
      ? `There are ${invoiceCount} total invoices`
      : `There are ${invoiceCount} filtered invoices`;
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar-left">
        <h1>Invoices</h1>
        <p>{getStatusLabel()}</p>
      </div>
      <div className="filter-bar-right">
        <div className="filter-wrappper" ref={dropdownRef}>
          <button className="filter-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span>{getFilterLabel()}</span>
            <i className="fa-solid fa-chevron-down"></i>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <label className="checkbox" onClick={() => handleFilterChange("all")}>
                <input type="checkbox" checked={currentFilter === "all"} readOnly />
                <span>All</span>
              </label>
              <label className="checkbox" onClick={() => handleFilterChange("draft")}>
                <input type="checkbox" checked={currentFilter === "draft"} readOnly />
                <span>Draft</span>
              </label>
              <label className="checkbox" onClick={() => handleFilterChange("pending")}>
                <input type="checkbox" checked={currentFilter === "pending"} readOnly />
                <span>Pending</span>
              </label>
              <label className="checkbox" onClick={() => handleFilterChange("paid")}>
                <input type="checkbox" checked={currentFilter === "paid"} readOnly />
                <span>Paid</span>
              </label>
            </div>
          )}
        </div>
        <button className="btn-primary" onClick={onCreateInvoice}>
          <div className="plus-circle">
            <i className="fa-solid fa-plus"></i>
          </div>
          <span className="btn-text-desktop">New Invoice</span>
          <span className="btn-text-mobile">New</span>
        </button>
      </div>
    </div>
  );
}
