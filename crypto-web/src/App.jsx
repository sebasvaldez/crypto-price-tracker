import { Navbar } from "./components/navbar/Navbar";
import { Routes, Route } from "react-router";
import { Homepage } from "./pages/home/Homepage";
import { CoinPage } from "./pages/coin/CoinPage";
import { Footer } from "./components/footer/Footer";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coin/:coinId" element={<CoinPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
