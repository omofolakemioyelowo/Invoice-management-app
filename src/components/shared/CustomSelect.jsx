import { useState, useRef, useEffect } from "react";
import "./CustomSelect.css";

export default function CustomSelect({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="custom-select-container" ref={dropdownRef}>
      <div 
        className={`custom-select-trigger ${isOpen ? "open" : ""}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.label : ""}</span>
        <i className={`fa-solid fa-chevron-down ${isOpen ? "rotate" : ""}`}></i>
      </div>
      
      {isOpen && (
        <div className="custom-select-dropdown">
          {options.map((option) => (
            <div 
              key={option.value} 
              className="custom-select-option"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
