import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
import { PaginationHome } from "../../components/pagination/PaginationHome";
import "./HomePage.css";

export const Homepage = () => {
  const { allCoins, currency } = useContext(CoinContext);

  const [displayCoins, setDisplayCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (!event.target.value) {
      setDisplayCoins(allCoins);
    }
  };
  const cryptosPerPage = 20;
  const indexOfLastCrypto = page * cryptosPerPage;
  const indexOfFirstCrypto = indexOfLastCrypto - cryptosPerPage;
  const currentCryptos = displayCoins.slice(
    indexOfFirstCrypto,
    indexOfLastCrypto
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoins.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoins(coins);
  };

  useEffect(() => {
    setDisplayCoins(allCoins);
  }, [allCoins]);

  return (
    <div className="home">
      <div className="hero">
        <h1>Crypto Price Tracker</h1>
        <p>
          Bienvenido a Crypto Price tracker, un proyecto pensado como rastreador
          de precios de criptomonedas. Regístrate para explorar y conocer más.
        </p>
        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            value={input}
            type="text"
            placeholder="Buscar cripto..."
            required
            list="coinList"
          />
          <datalist id="coinList">
            {displayCoins.map((item) => (
              <option key={item.id} value={item.name} />
            ))}
          </datalist>

          <button type="submit">Buscar</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Moneda</p>
          <p className="price">Precio</p>
          <p className="change24">Cambio en 24hs</p>
          <p className="market-cap">Cap. de mercado</p>
        </div>
        {currentCryptos.map((item) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={item.id}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img
                src={item.image}
                alt="Imagen del simbolo de la criptomoneda"
              />
              <p>{item.name + "_" + item.symbol}</p>
            </div>
            <p style={{ textAlign: "center" }}>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {item.price_change_percentage_24h.toLocaleString()}
            </p>
            <p className="market-cap">
              {currency.symbol}
              {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
      <PaginationHome
        count={Math.ceil(displayCoins.length / cryptosPerPage)}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
};
