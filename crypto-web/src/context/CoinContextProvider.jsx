import { useEffect, useState } from "react";
import { CoinContext } from "./CoinContext";

export const CoinContextProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({ name: "usd", symbol: " US$" });

  const fetchAllCoins = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-ShVMZ9Z1v1J9XYjMukcapti7",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setAllCoins(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAllCoins();
  }, [currency]);

  console.log(allCoins)

  const contextValue = {
    allCoins,currency,setCurrency
  };

  return (
    <CoinContext.Provider value={ contextValue }>
      {children}
    </CoinContext.Provider>
  );
};

