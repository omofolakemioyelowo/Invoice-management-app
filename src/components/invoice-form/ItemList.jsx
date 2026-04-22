import "./ItemList.css";
import InputField from "../shared/InputField";

export default function ItemList({ items, onItemsChange, errors = {} }) {
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: field === "quantity" ? parseInt(value) || 0 : value };
    onItemsChange(newItems);
  };

  const handleDeleteItem = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      onItemsChange(newItems);
    }
  };

  const handleAddItem = () => {
    onItemsChange([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const calculateTotal = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  return (
    <div className="item-list-section">
      <h3>Item List</h3>
      
      <div className="item-list-headers">
        <span className="col-name">Item Name</span>
        <span className="col-qty">Qty.</span>
        <span className="col-price">Price</span>
        <span className="col-total">Total</span>
        <span className="col-action"></span>
      </div>

      {items.map((item, idx) => (
        <div className="item-row" key={idx}>
          <div className="col-name">
            <InputField 
              value={item.name} 
              onChange={(e) => handleItemChange(idx, "name", e.target.value)} 
              error={errors[`items.${idx}.name`]}
            />
          </div>
          <div className="col-qty">
            <InputField 
              type="number"
              value={item.quantity} 
              onChange={(e) => handleItemChange(idx, "quantity", e.target.value)} 
              error={errors[`items.${idx}.quantity`]}
            />
          </div>
          <div className="col-price">
            <InputField 
              value={item.price} 
              onChange={(e) => handleItemChange(idx, "price", e.target.value)} 
              error={errors[`items.${idx}.price`]}
            />
          </div>
          <div className="col-total">
            <span className="item-total-value">£ {calculateTotal(item)}</span>
          </div>
          <div className="col-action">
            <button className="delete-item-btn" onClick={() => handleDeleteItem(idx)}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      ))}

      <button className="add-new-item-btn" onClick={handleAddItem}>
        + Add New Item
      </button>
    </div>
  );
}
