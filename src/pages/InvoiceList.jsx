import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import InvoiceCard from "../components/InvoiceCard";
import NoInvoices from "../components/NoInvoices";

export default function InvoiceList({ invoices, onCreateInvoice }) {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const filteredInvoices = filter === "all" 
    ? invoices 
    : invoices.filter(inv => inv.status === filter);

  const handleInvoiceClick = (id) => {
    navigate(`/invoice/${id}`);
  };

  const handleCreateClick = () => {
    onCreateInvoice();
  };

  return (
    <div>
      <FilterBar 
        invoiceCount={invoices.length} 
        currentFilter={filter}
        onFilterChange={setFilter}
        onCreateInvoice={handleCreateClick}
      />
      {filteredInvoices.length === 0 ? (
        <NoInvoices />
      ) : (
        filteredInvoices.map(invoice => (
          <InvoiceCard 
            key={invoice.id} 
            invoice={invoice} 
            onClick={() => handleInvoiceClick(invoice.id)} 
          />
        ))
      )}
    </div>
  );
}
