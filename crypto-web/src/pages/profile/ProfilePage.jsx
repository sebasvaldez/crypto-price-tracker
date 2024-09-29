import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Button,
  Collapse,
  OutlinedInput,
  TextField,
  useMediaQuery,
} from "@mui/material";
import "./ProfilePage.css";

export const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);

  const [showInputEmail, setShowInputEmail] = useState(false);

  const [showInputPassword, setShowInputPassword] = useState(false);

  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const isMedium = useMediaQuery("(min-width:768px)");

  const handleToggleInputEmail = () => {
    setShowInputEmail(!showInputEmail);
  };
  const handleInputPassword = () => {
    setShowInputPassword(!showInputPassword);
  };

  const handleInputdeleteAccount = () => {
    setShowDeleteAccount(!showDeleteAccount);
  };

  return (
    <div className="profile-box" sx={{ margin: "20px", padding: "20px" }}>
      <h2 className="profile-title">
        Inicio de sesión y seguridad de {currentUser?.name}
      </h2>

      <div className="profile-mail">
        <div >
          <h4>Correo electrónico</h4>
          <p>{currentUser?.email}</p>
        </div>

        <Button
          variant="outlined"
          color="white"
          sx={{ margin: "10px", paddingX: "70px" }}
          onClick={handleToggleInputEmail}
        >
          Cambiar correo electrónico
        </Button>
        <Collapse
          in={showInputEmail}
          timeout={300}
          className="profile-collapse"
        >
          <TextField
            sx={{
              variant: "standard",
              margin: "5px",
              width: `${isMedium ? "50%" : "90%"}`,
              input: { color: "white" },
            }}
            placeholder="Nuevo correo electrónico"
          />
          <div className="profile-modifier-buttons">
            <Button
              variant="outlined"
              color="white"
              sx={{ fontSize: "12px", padding: "2px", marginRight: "20px" }}
            >
              Modificar
            </Button>
            <Button
              variant="outlined"
              color="white"
              sx={{ fontSize: "12px", padding: "5px" }}
            >
              Cancelar
            </Button>
          </div>
        </Collapse>
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
          onClick={handleInputPassword}

        >
          Cambiar contraseña
        </Button>
        <Collapse
          in={showInputPassword}
          timeout={300}
          className="profile-collapse"
        >
          <TextField
            sx={{
              variant: "outlined",
              margin: "5px",
              width: `${isMedium ? "90%" : "90%"}`,
              input: { color: "white" },
            }}
            placeholder="Nueva contraseña"
            margin="dense"
            type="password"
          />
          <TextField
            sx={{
              variant: "outlined",
              margin: "5px",
              width: `${isMedium ? "90%" : "90%"}`,
              input: { color: "white" },
            }}
            placeholder="Repetir contraseña"
            margin="dense"
            type="password"
          />

          <div className="profile-modifier-buttons">
            <Button
              variant="outlined"
              color="white"
              sx={{ fontSize: "12px", padding: "5px", marginRight: "20px" }}
            >
              Modificar
            </Button>
            <Button
              variant="outlined"
              color="white"
              sx={{ fontSize: "12px", padding: "5px" }}
            >
              Cancelar
            </Button>
          </div>
        </Collapse>
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
          onClick={handleInputdeleteAccount}
        >
          Eliminar cuenta
        </Button>
        <Collapse in={showDeleteAccount} timeout={300}>
          <TextField
            sx={{
              variant: "outlined",
              margin: "5px",
              width: `${isMedium ? "50%" : "90%"}`,
              input: { color: "white" },
            }}
            placeholder="Contraseña"
            type="password"
          />

          <div className="profile-modifier-buttons">
            <Button
              variant="outlined"
              color="white"
              sx={{ fontSize: "12px", padding: "5px", marginRight: "20px" }}
            >
              Modificar
            </Button>
            <Button
              variant="outlined"
              color="white"
              sx={{ fontSize: "12px", padding: "5px" }}
            >
              Cancelar
            </Button>
          </div>
        </Collapse>
      </div>
    </div>
  );
};
