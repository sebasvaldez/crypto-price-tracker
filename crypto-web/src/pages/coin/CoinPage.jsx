import { useContext, useEffect, useState } from "react";
import "./CoinPage.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import { LineChart } from "../../components/linechart/LineChart";
import Swal from "sweetalert2";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Icon, IconButton } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

export const CoinPage = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);
  const { currentUser } = useContext(AuthContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-ShVMZ9Z1v1J9XYjMukcapti7",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-ShVMZ9Z1v1J9XYjMukcapti7",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHistoricalData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (coinData && historicalData) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData?.image.large} alt="" />
          <p className="coin-fav">
            <b>
              {coinData?.name} ({coinData?.symbol.toUpperCase()})
            </b>
            {
              <IconButton
                sx={{ marginLeft: "20px" }}
                onClick={() => {
                  if (currentUser) {
                    Swal.fire({
                      title: "Añadido a favoritos",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  } else {
                    Swal.fire({
                      title: "Debes iniciar sesión para añadir un favorito",
                      icon: "error",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                }}
              >
                <StarBorderIcon sx={{ fontSize: "30px" }} />
              </IconButton>
            }
          </p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market cap</li>
            <li>
              {currency.symbol}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour high</li>
            <li>
              {currency.symbol}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour low</li>
            <li>
              {currency.symbol}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};
