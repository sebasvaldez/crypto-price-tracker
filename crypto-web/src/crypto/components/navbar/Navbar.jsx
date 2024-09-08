import { useContext } from "react";
import { CoinContext } from "../../../context/CoinContext";
import "./Navbar.css";
import logo from "../../../assets/logo.png";
import arrow_icon from "../../../assets/arrow_icon.png";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const handleCurrencyChange = (e) => {
    console.log(e.target.value);
    switch (e.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });

        break;
      case "ars":
        setCurrency({ name: "ars", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };

  return (
    <div className="navbar">
      <Link to={'/'} >
      <img src={logo} alt="logo" className="logo" />
      </Link>
      <ul>
      <Link to={'/'}> <li>Principal</li></Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={handleCurrencyChange}>
          <option value="usd">USD</option>
          <option value="ars">ARS</option>
          <option value="eur">EUR</option>
        </select>
        <button>
          Sign Up <img src={arrow_icon} alt="" />
        </button>
      </div>
    </div>
  );
};
