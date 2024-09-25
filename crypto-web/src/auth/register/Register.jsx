import { AuthContext } from "../../context/AuthContext";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Box,Alert } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import "./Register.css";

export const Register = () => {
  const { registerUser, error, setError } = useContext(AuthContext);
  const navigate = useNavigate();
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

  const handleSubmit = async () => {
    await registerUser(user.name, user.email, user.password);
    if (!error) {
      navigate("/login");
    } else {
    }
    console.log(error);

  };


  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);




  return (
    <div className="container-auth">
      <Box sx={{ mt: 2, mb: 2 }}>
        <Box sx={{ display: error ? "block" : "none" }}>
          <Alert severity="error">{error ? error : ""}</Alert>
        </Box>
      </Box>
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
