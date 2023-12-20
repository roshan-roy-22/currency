import "./App.css";
import { useState } from "react";
import InputBox from "./components/InputBox";
import img1 from "./images/exchanging.png";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };
  return (
    <div className="bg-[#E2DCDC] h-screen">
      <div className="w-full h-4/5 flex flex-col justify-center items-center  ">
        <h1
          style={{ fontFamily: "initial" }}
          className="text-6xl my-8 font-bold"
        >
          Currency Converter
        </h1>
        <div
          className="grid grid-cols-2 border shadow-lg backdrop-blur-3xl bg-white rounded-xl p-12 max-w-xl"
          style={{ boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px" }}
        >
          <div className="pt-5">
            <img className="h-48" src={img1} alt="" />
          </div>
          <div>
            <div className="w-full mx-auto ">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  convert();
                }}
              >
                <div className="w-full mb-1">
                  <InputBox
                    label="from"
                    amount={amount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => setFrom(currency)}
                    onAmountChange={(amount) => setAmount(amount)}
                    selectedCurrency={from}
                  />
                </div>
                <div className="relative w-full h-0.5">
                  <button
                    onClick={swap}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-orange-600 text-white px-2 py-0.5"
                  >
                    Swap
                  </button>
                </div>
                <div className="w-full mb-1">
                  <InputBox
                    label="to"
                    currencyOptions={options}
                    amount={convertedAmount}
                    onCurrencyChange={(currency) => setTo(currency)}
                    selectedCurrency={to}
                    amountDisabled
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white px-4 py-3 rounded-lg"
                >
                  Convert {from.toUpperCase()} to {to.toUpperCase()}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
