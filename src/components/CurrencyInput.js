import React from "react";
import './CurrencyInput.css';
const CurrencyInput = ({
  value,
  currency,
  currencies,
  onAmountChange,
  onCurrencyChange,
}) => {
  return (
    <div className="currencyInput">
    <div className="wrapper">
      <input value={value} 
      onChange={(e) => onAmountChange(e.target.value)}
      />
      <select value={currency}
      onChange={(e) => onCurrencyChange(e.target.value)}
      >
        
        {currencies.map((currency) => (
          <option value={currency}> {currency} </option>
        ))}
      </select>
    </div>
    </div>
  );
};

export default CurrencyInput;
