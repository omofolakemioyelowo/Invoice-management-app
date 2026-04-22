import { useState, useEffect } from "react";
import "./FormDrawer.css";
import InputField from "../shared/InputField";
import ItemList from "./ItemList";
import CustomSelect from "../shared/CustomSelect";
import DatePicker from "./DatePicker";

const generateId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

const formatDate = (date) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export default function FormDrawer({ isEdit = false, invoice, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: "",
    description: "",
    createdAt: "",
    paymentDue: "",
    senderAddress: { street: "", city: "", postCode: "", country: "" },
    clientAddress: { name: "", email: "", street: "", city: "", postCode: "", country: "" },
    items: [{ name: "", quantity: 1, price: 0 }],
    status: "draft",
  });

  const [paymentTerms, setPaymentTerms] = useState(30);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit && invoice) {
      setFormData({ ...invoice });
      const terms = invoice.paymentDue && invoice.createdAt 
        ? Math.ceil((new Date(invoice.paymentDue) - new Date(invoice.createdAt)) / (1000 * 60 * 60 * 24))
        : 30;
      setPaymentTerms(terms);
    } else {
      const today = new Date();
      setFormData({
        id: generateId(),
        description: "",
        createdAt: formatDate(today),
        paymentDue: formatDate(addDays(today, 30)),
        senderAddress: { street: "", city: "", postCode: "", country: "" },
        clientAddress: { name: "", email: "", street: "", city: "", postCode: "", country: "" },
        items: [{ name: "", quantity: 1, price: 0 }],
        status: "draft",
      });
      setPaymentTerms(30);
    }
  }, [isEdit, invoice]);

  const handleInputChange = (field, value, isNested = false, parentKey = "") => {
    if (isNested && parentKey) {
      setFormData(prev => ({
        ...prev,
        [parentKey]: { ...prev[parentKey], [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handlePaymentTermsChange = (days) => {
    const numDays = parseInt(days) || 30;
    setPaymentTerms(numDays);
    const dueDate = addDays(new Date(formData.createdAt || new Date()), numDays);
    setFormData(prev => ({ ...prev, paymentDue: formatDate(dueDate) }));
  };

  const handleItemsChange = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setFormData(prev => ({ ...prev, items, total }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    const checkEmpty = (val, key) => {
      if (!val || val.toString().trim() === "") {
        newErrors[key] = "can't be empty";
        isValid = false;
      }
    };

    checkEmpty(formData.senderAddress.street, "senderAddress.street");
    checkEmpty(formData.senderAddress.city, "senderAddress.city");
    checkEmpty(formData.senderAddress.postCode, "senderAddress.postCode");
    checkEmpty(formData.senderAddress.country, "senderAddress.country");

    checkEmpty(formData.clientAddress.name, "clientAddress.name");
    checkEmpty(formData.clientAddress.email, "clientAddress.email");
    checkEmpty(formData.clientAddress.street, "clientAddress.street");
    checkEmpty(formData.clientAddress.city, "clientAddress.city");
    checkEmpty(formData.clientAddress.postCode, "clientAddress.postCode");
    checkEmpty(formData.clientAddress.country, "clientAddress.country");

    checkEmpty(formData.description, "description");

    if (formData.items.length === 0) {
      newErrors.globalItems = "- An item must be added";
      isValid = false;
    } else {
      formData.items.forEach((item, idx) => {
        if (!item.name || item.name.trim() === "") {
          newErrors[`items.${idx}.name`] = "can't be empty";
          isValid = false;
        }
        if (!item.quantity || item.quantity <= 0) {
          newErrors[`items.${idx}.quantity`] = "can't be empty";
          isValid = false;
        }
        if (!item.price || item.price <= 0) {
          newErrors[`items.${idx}.price`] = "can't be empty";
          isValid = false;
        }
      });
    }

    if (!isValid && !newErrors.globalItems) {
      newErrors.globalFields = "- All fields must be added";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (status) => {
    if (status !== "draft" && !validateForm()) {
      return;
    }

    const invoiceData = {
      ...formData,
      status,
      total: formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    };
    onSave(invoiceData);
  };

  return (
    <div className="form-drawer-overlay">
      <div className="form-drawer">
        <h1 className="drawer-title">
          {isEdit ? (
            <>Edit <span>#</span>{formData.id}</>
          ) : (
            "New Invoice"
          )}
        </h1>

        <div className="form-content">
          <section className="form-section">
            <h4 className="section-title">Bill From</h4>
            <div className="form-row">
              <InputField 
                label="Street Address" 
                value={formData.senderAddress.street}
                onChange={(e) => handleInputChange("street", e.target.value, true, "senderAddress")}
                error={!!errors["senderAddress.street"]}
                errorMessage={errors["senderAddress.street"]}
              />
            </div>
            <div className="form-row three-cols">
              <InputField 
                label="City" 
                value={formData.senderAddress.city}
                onChange={(e) => handleInputChange("city", e.target.value, true, "senderAddress")}
                error={!!errors["senderAddress.city"]}
                errorMessage={errors["senderAddress.city"]}
              />
              <InputField 
                label="Post Code" 
                value={formData.senderAddress.postCode}
                onChange={(e) => handleInputChange("postCode", e.target.value, true, "senderAddress")}
                error={!!errors["senderAddress.postCode"]}
                errorMessage={errors["senderAddress.postCode"]}
              />
              <InputField 
                label="Country" 
                value={formData.senderAddress.country}
                onChange={(e) => handleInputChange("country", e.target.value, true, "senderAddress")}
                error={!!errors["senderAddress.country"]}
                errorMessage={errors["senderAddress.country"]}
              />
            </div>
          </section>

          <section className="form-section">
            <h4 className="section-title">Bill To</h4>
            <div className="form-row">
              <InputField 
                label="Client's Name" 
                value={formData.clientAddress.name}
                onChange={(e) => handleInputChange("name", e.target.value, true, "clientAddress")}
                error={!!errors["clientAddress.name"]}
                errorMessage={errors["clientAddress.name"]}
              />
            </div>
            <div className="form-row">
              <InputField 
                label="Client's Email" 
                type="email"
                value={formData.clientAddress.email}
                onChange={(e) => handleInputChange("email", e.target.value, true, "clientAddress")}
                error={!!errors["clientAddress.email"]}
                errorMessage={errors["clientAddress.email"]}
              />
            </div>
            <div className="form-row">
              <InputField 
                label="Street Address" 
                value={formData.clientAddress.street}
                onChange={(e) => handleInputChange("street", e.target.value, true, "clientAddress")}
                error={!!errors["clientAddress.street"]}
                errorMessage={errors["clientAddress.street"]}
              />
            </div>
            <div className="form-row three-cols">
              <InputField 
                label="City" 
                value={formData.clientAddress.city}
                onChange={(e) => handleInputChange("city", e.target.value, true, "clientAddress")}
                error={!!errors["clientAddress.city"]}
                errorMessage={errors["clientAddress.city"]}
              />
              <InputField 
                label="Post Code" 
                value={formData.clientAddress.postCode}
                onChange={(e) => handleInputChange("postCode", e.target.value, true, "clientAddress")}
                error={!!errors["clientAddress.postCode"]}
                errorMessage={errors["clientAddress.postCode"]}
              />
              <InputField 
                label="Country" 
                value={formData.clientAddress.country}
                onChange={(e) => handleInputChange("country", e.target.value, true, "clientAddress")}
                error={!!errors["clientAddress.country"]}
                errorMessage={errors["clientAddress.country"]}
              />
            </div>
          </section>

          <section className="form-section">
            <div className="form-row two-cols">
              <div className="input-field-wrapper">
                <div className="label-container"><label>Invoice Date</label></div>
                <DatePicker 
                  value={formData.createdAt} 
                  onChange={(date) => {
                    handleInputChange("createdAt", formatDate(date));
                    handlePaymentTermsChange(paymentTerms);
                  }}
                />
              </div>
              <div className="input-field-wrapper">
                <div className="label-container"><label>Payment Terms</label></div>
                <CustomSelect 
                  value={paymentTerms} 
                  onChange={handlePaymentTermsChange}
                  options={[
                    { value: 1, label: "Net 1 Day" },
                    { value: 7, label: "Net 7 Days" },
                    { value: 14, label: "Net 14 Days" },
                    { value: 30, label: "Net 30 Days" }
                  ]}
                />
              </div>
            </div>
            <div className="form-row">
              <InputField 
                label="Project Description" 
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                error={!!errors["description"]}
                errorMessage={errors["description"]}
              />
            </div>
          </section>

          <ItemList items={formData.items} onItemsChange={handleItemsChange} errors={errors} />
          
          {(errors.globalFields || errors.globalItems) && (
            <div className="global-errors">
              {errors.globalFields && <p>{errors.globalFields}</p>}
              {errors.globalItems && <p>{errors.globalItems}</p>}
            </div>
          )}
        </div>

        <div className={`drawer-footer ${isEdit ? "edit-mode" : "new-mode"}`}>
          {!isEdit ? (
            <>
              <button className="btn-discard" onClick={onClose}>Discard</button>
              <div className="right-actions">
                <button className="btn-save-draft" onClick={() => handleSubmit("draft")}>Save as Draft</button>
                <button className="btn-save-send" onClick={() => handleSubmit("pending")}>Save & Send</button>
              </div>
            </>
          ) : (
            <div className="right-actions edit-actions">
              <button className="btn-cancel-edit" onClick={onClose}>Cancel</button>
              <button className="btn-save-changes" onClick={() => handleSubmit(formData.status)}>Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
