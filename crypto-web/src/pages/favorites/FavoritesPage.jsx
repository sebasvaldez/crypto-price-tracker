import { CoinContext } from "../../context/CoinContext";
import "./FavoritesPage.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { IconButton } from "@mui/material";
import Swal from "sweetalert2";

export const FavoritesPage = () => {
  const { allCoins, favoritesCoins, currency, deleteFavoritecoin } =
    useContext(CoinContext);

  const matchingCoins = allCoins.filter((coin) =>
    favoritesCoins.some((favCoin) => favCoin.coinId === coin.id)
  );

  return (
    <div className="crypto-table-fav">
      <div className="table-layout-fav">
        <p></p>
        <p>#</p>
        <p>Moneda</p>
        <p>Precio</p>
        <p style={{ textAlign: "center" }}>Cambio en 24hs</p>
        <p className="market-cap">Cap. de mercado</p>
      </div>
      {matchingCoins.slice(0, 15).map((item) => (
        <Link
          to={`/coin/${item.id}`}
          className="table-layout-fav"
          key={item.id}
        >
          <IconButton
            sx={{ marginRight: "20px" }}
            onClick={(e) => {
              Swal.fire({
                title: "Eliminado de favoritos",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
              e.preventDefault();
              e.stopPropagation();
              deleteFavoritecoin(item.id);
            }}
          >
            <StarIcon sx={{ fontSize: "25px", color: "yellow" }} />
          </IconButton>

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
