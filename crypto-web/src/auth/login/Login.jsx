import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export const Login = () => {
  const { loginUser } = useContext(AuthContext);

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

  const handleSubmit = () => {
    loginUser(email.email, email.password);
    navigate("/");
  };

  return (
    <div className="container-auth">
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
