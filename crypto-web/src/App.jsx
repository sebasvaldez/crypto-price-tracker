import { useContext } from "react";
import { Navbar } from "./components/navbar/Navbar";
import { Routes, Route } from "react-router";
import { Homepage } from "./pages/home/Homepage";
import { CoinPage } from "./pages/coin/CoinPage";
import { Footer } from "./components/footer/Footer";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { FavoritesPage } from "./pages/favorites/FavoritesPage";
import { PrivateRoutes } from "./components/privateRoutes/PrivateRoutes";
import { PublicRoutes } from "./components/publicRoutes/PublicRoutes";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      {/* Rutas publicas*/}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coin/:coinId" element={<CoinPage />} />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <LoginPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoutes>
              <RegisterPage />
            </PublicRoutes>
          }
        />

        {/* Rutas privadas */}

        <Route
          path="/favorites"
          element={
            <PrivateRoutes>
              <FavoritesPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <h1>Perfil</h1>
            </PrivateRoutes>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
