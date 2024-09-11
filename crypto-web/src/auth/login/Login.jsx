import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";



export const Login = () => {

  return (
    <div className="container-auth">
      <div className="header-auth">
        <div className="text">Ingresar</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        
        <div className="input">
          <EmailIcon sx={{ marginX: "10px" }} />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <HttpsIcon sx={{ marginX: "10px" }} />
          <input type="password" placeholder="Contraseña" />
        </div>
      </div>
      <div className="forgot-password">
        Perdiste la contraseña? <span>Click aquí!</span>
      </div>
      <div className="submit-container">
        <div className="submit">Ingresar</div>
      </div>
    </div>
  );
};
