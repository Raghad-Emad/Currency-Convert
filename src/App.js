import "./App.css";
import CurrencyInput from "./components/CurrencyInput";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const API_KEY = "MoeMEopDxctnTDWhfd6DuUZAb9S808vGWaDYunhw";
const CURRENCY_API = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;

function App() {
  const [currencyRates, setCurrencyRates] = useState([]);
  const [amountBase, setAmountBase] = useState(1);
  const [amountRate, setAmountRate] = useState(1);
  const [currencyBase, setCurrencyBase] = useState("USD");
  const [currencyRate, setCurrencyRate] = useState("INR");

  useEffect(() => {
    axios
      .get(CURRENCY_API)
      .then((response) => setCurrencyRates(response.data.data))
      .catch((err) => {
        console.log(err);
        setCurrencyRates(null);
      });
  }, []);

  const handleAmountOneChange = (amountBase) => {
    setAmountRate(
      formatCurrency((amountBase * currencyRates[currencyRate]) / currencyRates[currencyBase]
    ));
    setAmountBase(amountBase);
  };

  useEffect(() => {
    if (!!currencyRates) {
      handleAmountOneChange(1);
    }
  }, [currencyRates])

  const formatCurrency = (number) => {
    return number.toFixed(2)
  }
  
  const handleAmountTwoChange = (amountRate) => {
    setAmountBase(
      formatCurrency((amountRate * currencyRates[currencyBase]) / currencyRates[currencyRate]
    ));
    setAmountRate(amountRate);
  };

  const handleCurrencyOneChange = (currencyBase) => {
    setAmountRate(
      (amountBase * currencyRates[currencyRate]) / currencyRates[currencyBase]
    );
    setCurrencyBase(currencyBase);
  };

  const handleCurrencyTwoChange = (currencyRate) => {
    setAmountBase(
      (amountRate * currencyRates[currencyBase]) / currencyRates[currencyRate]
    );
    setCurrencyRate(currencyRate);
  };

  if (!currencyRates) return <p>Something went wrong !</p>
  if (currencyRates.length === 0 ) return <p>Loading...</p>;

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <p className="baseCurrencyText"> {amountBase} {currencyBase} equals</p>
      <p className="rateCurrencyText"> {formatCurrency(amountRate/amountBase)} {currencyRate} </p>
      <p className="date">
        {format(new Date(), 'dd/MM/yyyy h:mm')}
      </p>
      <CurrencyInput
        value={amountBase}
        currency={currencyBase}
        currencies={Object.keys(currencyRates || {})}
        onAmountChange={handleAmountOneChange}
        onCurrencyChange={handleCurrencyOneChange}
      />
      <CurrencyInput
        value={amountRate}
        currency={currencyRate}
        currencies={Object.keys(currencyRates || {})}
        onAmountChange={handleAmountTwoChange}
        onCurrencyChange={handleCurrencyTwoChange}
      />
    </div>
  );
}

export default App;

// setCurrencyRates(response.data.rates)
