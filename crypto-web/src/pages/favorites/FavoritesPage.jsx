import { useContext } from "react";
import { Favorites } from "../../components/favorites/Favorites";
import { NoFavorites } from "../../components/favorites/NoFavorites";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

export const FavoritesPage = () => {
  const { favoritesCoins } = useContext(CoinContext);

  if (favoritesCoins.length === 0) {
    return (
      <Box>
        <NoFavorites />
      </Box>
    );
    
  } else {
    return (
      <Box>
        <Favorites />
      </Box>
    );
  }
};
