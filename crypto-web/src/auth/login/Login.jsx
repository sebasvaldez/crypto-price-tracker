import { Grid2, Alert, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export const Login = () => {
  const { loginUser, error, setError } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(email.email, email.password);

    if (!error) {
      console.log(error);
    } else {
      navigate("/");
    }
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
        <div className="text">Ingresar</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
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
          Ingresar
        </div>
      </div>
    </div>
  );
};
