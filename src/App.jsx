import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SideBar from "./components/layout/SideBar";
import InvoiceList from "./pages/InvoiceList";
import InvoiceDetail from "./pages/InvoiceDetail";
import FormDrawer from "./components/invoice-form/FormDrawer";
import invoicesData from "./data/data.json";

export default function App() {
  const [invoices, setInvoices] = useState(invoicesData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const navigate = useNavigate();

  const handleCreateInvoice = (newInvoice) => {
    setInvoices([...invoices, newInvoice]);
    setIsDrawerOpen(false);
  };

  const handleEditInvoice = (updatedInvoice) => {
    setInvoices(invoices.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv));
    setIsDrawerOpen(false);
    setEditingInvoice(null);
  };

  const handleDeleteInvoice = (id) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
    navigate("/");
  };

  const handleMarkAsPaid = (id) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: "paid" } : inv));
  };

  const openNewInvoice = () => {
    setEditingInvoice(null);
    setIsDrawerOpen(true);
  };

  const openEditInvoice = (invoice) => {
    setEditingInvoice(invoice);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingInvoice(null);
  };

  return (
    <div className="app-container">
      <SideBar />

      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<InvoiceList invoices={invoices} onCreateInvoice={openNewInvoice} />} />
            <Route path="/invoice/:id" element={<InvoiceDetail invoices={invoices} onDelete={handleDeleteInvoice} onMarkAsPaid={handleMarkAsPaid} onEdit={openEditInvoice} />} />
          </Routes>
        </div>
      </main>

      {isDrawerOpen && (
        <FormDrawer 
          isEdit={!!editingInvoice} 
          invoice={editingInvoice} 
          onClose={closeDrawer}
          onSave={editingInvoice ? handleEditInvoice : handleCreateInvoice}
        />
      )}
    </div>
  );
}
