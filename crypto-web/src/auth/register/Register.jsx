import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import "./Register.css";
import { useState } from "react";

export const Register = () => {
  const [user, setUset] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUset({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(user);
  };

  return (
    <div className="container-auth">
      <div className="header-auth">
        <div className="text">Registrarse</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <AccountCircleIcon sx={{ marginX: "10px" }} />
          <input
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Nombre"
          />
        </div>
        <div className="input">
          <EmailIcon sx={{ marginX: "10px" }} />
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="input">
          <HttpsIcon sx={{ marginX: "10px" }} />
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Contraseña"
          />
        </div>
      </div>
      <div className="forgot-password">
        Perdiste la contraseña? <span>Click aquí!</span>
      </div>
      <div className="submit-container">
        <div onClick={handleSubmit} className="submit">
          Registrar
        </div>
      </div>
    </div>
  );
};
