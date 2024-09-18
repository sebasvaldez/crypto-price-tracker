import { CoinContext } from '../../context/CoinContext';
import './FavoritesPage.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';




export const FavoritesPage = () => {


  const {allCoins,favoritesCoins, currency}= useContext(CoinContext);



  console.log(allCoins)
  console.log(favoritesCoins)


  const matchingCoins = allCoins.filter(coin => favoritesCoins.some(favCoin=>favCoin.coinId === coin.id))

  console.log(matchingCoins)




  return (
    <div className="crypto-table">
      <div className="table-layout">
        <p>#</p>
        <p>Moneda</p>
        <p>Precio</p>
        <p style={{ textAlign: "center" }}>Cambio en 24hs</p>
        <p className="market-cap">Cap. de mercado</p>
      </div>
      {matchingCoins.slice(0, 15).map((item) => (
        <Link to={`/coin/${item.id}`} className="table-layout" key={item.id}>
          <p>{item.market_cap_rank}</p>
          <div>
            <img src={item.image} alt="Imagen del simbolo de la criptomoneda" />
            <p>{item.name + "_" + item.symbol}</p>
          </div>
          <p>
            {currency.symbol} {item.current_price.toLocaleString()}
          </p>
          <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
            {item.price_change_percentage_24h.toLocaleString()}
          </p>
          <p className="market-cap">
            {currency.symbol}
            {item.market_cap.toLocaleString()}
          </p>
        </Link>
      ))}
    </div>
  );
};
