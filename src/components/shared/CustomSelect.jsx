import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "./CustomSelect.css";

export default function CustomSelect({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

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

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width
      });
    }
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);

  const dropdownContent = isOpen && (
    <div 
      className="custom-select-dropdown"
      style={{
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        width: dropdownPosition.width
      }}
    >
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
  );

  return (
    <div className="custom-select-container" ref={dropdownRef}>
      <div 
        className={`custom-select-trigger ${isOpen ? "open" : ""}`} 
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.label : ""}</span>
        <i className={`fa-solid fa-chevron-down ${isOpen ? "rotate" : ""}`}></i>
      </div>
      
      {dropdownContent && createPortal(dropdownContent, document.body)}
    </div>
  );
}
