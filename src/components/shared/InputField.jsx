import "./InputField.css";

export default function InputField({ label, id, type = "text", value, defaultValue, placeholder, onChange, error, errorMessage }) {
  return (
    <div className={`input-field-wrapper ${error ? "error" : ""}`}>
      <div className="label-container">
        {label && <label htmlFor={id}>{label}</label>}
        {error && errorMessage && <span className="error-message">{errorMessage}</span>}
      </div>
      <input 
        type={type} 
        id={id} 
        value={value} 
        defaultValue={defaultValue} 
        placeholder={placeholder} 
        onChange={onChange}
      />
    </div>
  );
}
