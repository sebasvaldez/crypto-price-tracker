import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import "./Register.css";


export const Register = () => {
  return (
    <div className="container-auth">
      <div className="header-auth">
        <div className="text">Registrarse</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <AccountCircleIcon />
          <input type="text" placeholder="Nombre" />
        </div>
        <div className="input" >
          <EmailIcon />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <HttpsIcon />
          <input type="password" placeholder="Contraseña" />
        </div>
      </div>
      <div className="forgot-password">
        Perdiste la contraseña? <span>Click aquí!</span>
      </div>
      <div className="submit-container">
        <div className="submit">Registrar</div>
        <div className="submit">Ingresar</div>
      </div>
    </div>
  )
}
