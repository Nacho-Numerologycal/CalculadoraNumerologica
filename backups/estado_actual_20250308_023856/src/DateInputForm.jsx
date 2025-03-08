import React from 'react';
import { Calendar } from 'lucide-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";

// Registrar localización española para el DatePicker
registerLocale('es', es);

const DateInputForm = ({ 
  day, 
  month, 
  year, 
  setDay, 
  setMonth, 
  setYear, 
  selectedDate, 
  setSelectedDate, 
  recentDates, 
  handleCalculate, 
  handleDatePickerChange, 
  dayInputRef, 
  monthInputRef, 
  yearInputRef 
}) => {
  // Manejadores de eventos para los inputs
  const handleDayChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 31)) {
      setDay(value);
    }
  };

  const handleMonthChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 12)) {
      setMonth(value);
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value === '' || parseInt(value) >= 0) {
      setYear(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <div className="date-input-form">
      <h3>Ingresa tu fecha de nacimiento</h3>
      <div className="date-inputs">
        <div className="input-group">
          <label htmlFor="day">Día:</label>
          <input
            type="text"
            id="day"
            placeholder="Día"
            value={day}
            onChange={handleDayChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            ref={dayInputRef}
            maxLength={2}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="month">Mes:</label>
          <input
            type="text"
            id="month"
            placeholder="Mes"
            value={month}
            onChange={handleMonthChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            ref={monthInputRef}
            maxLength={2}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="year">Año:</label>
          <input
            type="text"
            id="year"
            placeholder="Año"
            value={year}
            onChange={handleYearChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            ref={yearInputRef}
            maxLength={4}
          />
        </div>
        
        <div className="calendar-picker">
          <DatePicker
            selected={selectedDate}
            onChange={handleDatePickerChange}
            dateFormat="dd/MM/yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            yearDropdownItemNumber={100}
            scrollableYearDropdown
            locale="es"
            customInput={
              <button className="calendar-button">
                <Calendar size={18} />
              </button>
            }
          />
        </div>
      </div>
      
      {recentDates.length > 0 && (
        <div className="recent-dates">
          <h4>Fechas recientes:</h4>
          <div className="date-history">
            {recentDates.map((date, index) => (
              <button
                key={index}
                className="date-history-item"
                onClick={() => {
                  const [d, m, y] = date.split('/');
                  setDay(d);
                  setMonth(m);
                  setYear(y);
                  setSelectedDate(new Date(`${y}-${m}-${d}`));
                }}
              >
                {date}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateInputForm;
