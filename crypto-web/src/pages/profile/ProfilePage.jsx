import { useContext } from "react";
import {  Button } from "@mui/material";
import "./ProfilePage.css";
import { AuthContext } from "../../context/AuthContext";

export const ProfilePage = () => {

  const { currentUser } = useContext(AuthContext);



  return (
    <div className="profile-box" sx={{ margin: "20px", padding: "20px" }}>
      <h2 className="profile-title">
        Inicio de sesión y seguridad de {currentUser?.name}
      </h2>

      <div className="profile-mail">
        <div>
          <h4>Correo electrónico</h4>
          <p>{currentUser?.email}</p>
        </div>
        <Button
          variant="outlined"
          color="white"
          sx={{ margin: "10px", paddingX: "70px" }}
        >
          Cambiar correo electrónico
        </Button>
      </div>

      <div className="profile-mail">
        <div>
          <h4>Contraseña</h4>
          <p>Actualice su contraseña y proteja su cuenta. </p>
        </div>
        <Button
          variant="outlined"
          color="white"
          sx={{ margin: "10px", paddingX: "70px" }}
        >
          Cambiar contraseña
        </Button>
      </div>

      <div className="profile-delete">
        <div>
          <h4>Eliminar cuenta</h4>
          <p>
            Esta cuenta dejará de estar disponible y los datos guardados se
            eliminarán permanentemente.
          </p>
        </div>

        <Button
          variant="outlined"
          color="error"
          sx={{ margin: "10px", paddingX: "70px" }}
        >
          Eliminar cuenta
        </Button>
      </div>
    </div>
  );
};
