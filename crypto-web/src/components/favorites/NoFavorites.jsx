import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Favorites.css";

export const NoFavorites = () => {
  return (
    <Box sx={{ textAlign: "center" }} minHeight={"60vh"}>
      <h2>Aun no agregaste tus criptos favoritas, empezá ahora: </h2>
      <div className="no-fav-img" sx={{ mt: 2, mb: 2, width: "70%" }}>
        <img
          src="https://res.cloudinary.com/milayrock/image/upload/v1728531470/posible3_rumhd0.png"
          alt=""
        />
      </div>
      <Link to={"/"}>Ir a la lista de criptomonedas</Link>
    </Box>
  );
};
