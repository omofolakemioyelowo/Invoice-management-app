import { useState, useRef, useEffect } from "react";
import "./DatePicker.css";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function DatePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Parse initial value or use today
  const initialDate = value ? new Date(value) : new Date();
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  
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

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleSelectDate = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    onChange(selectedDate);
    setIsOpen(false);
  };

  // Generate calendar grid
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // Adjust for Monday start if needed, but let's stick to standard Sunday start (0 = Sunday)
  // Let's assume standard layout.
  const days = [];
  
  // Empty slots for previous month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({ day: null, key: `empty-${i}` });
  }
  
  // Days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, key: `day-${i}` });
  }

  const formattedValue = value ? `${new Date(value).getDate()} ${months[new Date(value).getMonth()]} ${new Date(value).getFullYear()}` : "";
  const selectedDay = value ? new Date(value).getDate() : null;
  const selectedMonth = value ? new Date(value).getMonth() : null;
  const selectedYear = value ? new Date(value).getFullYear() : null;

  return (
    <div className="datepicker-container" ref={dropdownRef}>
      <div 
        className={`datepicker-trigger ${isOpen ? "open" : ""}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{formattedValue}</span>
        <i className="fa-regular fa-calendar"></i>
      </div>
      
      {isOpen && (
        <div className="datepicker-dropdown">
          <div className="datepicker-header">
            <button className="nav-btn" onClick={handlePrevMonth}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <span className="current-month-year">
              {months[currentMonth]} {currentYear}
            </span>
            <button className="nav-btn" onClick={handleNextMonth}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          
          <div className="datepicker-grid">
            {days.map((item) => {
              const isSelected = item.day === selectedDay && currentMonth === selectedMonth && currentYear === selectedYear;
              return (
                <div 
                  key={item.key} 
                  className={`datepicker-day ${!item.day ? "empty" : ""} ${isSelected ? "selected" : ""}`}
                  onClick={() => item.day && handleSelectDate(item.day)}
                >
                  {item.day || ""}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
