import { Navbar } from "./crypto/components/navbar/Navbar";
import { Routes, Route } from "react-router";
import { Homepage } from "./pages/home/Homepage";
import {CoinPage} from "./pages/coin/CoinPage";
import { Footer } from "./crypto/components/footer/Footer";


const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coin/:coinId" element={<CoinPage />} />

      </Routes>
      <Footer />
    </div>
  );
};

export default App;
