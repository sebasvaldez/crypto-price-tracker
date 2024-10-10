import { AuthContext } from "../../context/AuthContext";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Box, Alert } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import "./Register.css";
import { Spinner } from "../../components/spinner/Spinner";

export const Register = () => {
  const { registerUser, error, setError, activeUser, handleErrorTranslator } =
    useContext(AuthContext);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userCredentials = await registerUser(
      user.name,
      user.email,
      user.password
    );

    if (!error && userCredentials) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  if (activeUser === null) {
    return (
      <div className="container-auth">
        <Box sx={{ mt: 2, mb: 2 }}>
          <Box sx={{ display: error ? "block" : "none" }}>
            <Alert severity="error">
              {error ? handleErrorTranslator(error) : ""}
            </Alert>
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
              required
            />
          </div>
          <div className="input">
            <EmailIcon sx={{ marginX: "10px" }} />
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="input">
            <HttpsIcon sx={{ marginX: "10px" }} />
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Contraseña"
              required
            />
          </div>
        </div>
        <div className="forgot-password">
          ¿Ya tenes cuenta? <Link to="/login">Click aquí!</Link>
        </div>
        <div className="submit-container">
          <div onClick={handleSubmit} className="submit">
            Registrar
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
};
