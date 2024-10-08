import { useState, useContext } from "react";
import { Button, Collapse, TextField } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

export const UserPassword = ({ isMedium }) => {
  const { updateUserPassword, error } = useContext(AuthContext);

  const [showInputPassword, setShowInputPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleInputPassword = () => {
    setShowInputPassword(!showInputPassword);
  };

  const checkPasswords = () => {
    if (currentPassword === "" || newPassword === "") {
      Swal.fire({
        title: "Error",
        text: "Debe completar todos los campos",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return false;
    } else if (currentPassword === newPassword) {
      Swal.fire({
        title: "Error",
        text: "La nueva contraseña no puede ser igual a la actual",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return false;
    } else if (newPassword.length < 6) {
      Swal.fire({
        title: "Error",
        text: "La nueva contraseña debe tener al menos 6 caracteres",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return false;
    } else {
      return true;
    }
  };

  const handleUpdatePassword = (currentPassword, newPassword) => {
    if (checkPasswords()) {
      updateUserPassword(currentPassword, newPassword);
    } else {
      return;
    }

    if (error) {
      Swal.fire({
        title: "Error",
        text: `${error}`,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    } else if (!error) {
      Swal.fire({
        title: "Contraseña actualizada",
        text: "Su contraseña ha sido actualizada correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
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
          placeholder="Contraseña actual"
          margin="dense"
          type="password"
          onChange={handleCurrentPassword}
          value={currentPassword}
        />
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
          onChange={handleNewPassword}
          value={newPassword}
        />

        <div className="profile-modifier-buttons">
          <Button
            variant="outlined"
            color="white"
            sx={{ fontSize: "12px", padding: "5px", marginRight: "20px" }}
            onClick={() => handleUpdatePassword(currentPassword, newPassword)}
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
  );
};
