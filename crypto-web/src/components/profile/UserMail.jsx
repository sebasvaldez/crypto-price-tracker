import { useState, useContext } from "react";
import { Button, Collapse, TextField } from "@mui/material";

import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

export const UserMail = ({ currentUser, isMedium }) => {
  const { updateUserEmail } = useContext(AuthContext);

  const [newEmail, setNewEmail] = useState("");
  const [showInputEmail, setShowInputEmail] = useState(false);

  const handleChangeEmail = (e) => {
    setNewEmail(e.target.value);
  };

  console.log(newEmail);

  const handleNewEmail = async () => {
    if (newEmail === "") {
      Swal.fire({
        title: "Error",
        text: "El campo no puede estar vacío",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      if (await updateUserEmail(newEmail)) {
        Swal.fire({
          title: "Correo actualizado",
          text: "Se ha actualizado tu correo electrónico",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error al actualizar tu correo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  const handleToggleInputEmail = () => {
    setShowInputEmail(!showInputEmail);
  };
  return (
    <div className="profile-mail">
      <div>
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
      <Collapse in={showInputEmail} timeout={300} className="profile-collapse">
        <TextField
          sx={{
            variant: "outlined",
            margin: "5px",
            width: `${isMedium ? "50%" : "90%"}`,
            input: { color: "white" },
          }}
          placeholder="Nuevo correo electrónico"
          value={newEmail}
          onChange={handleChangeEmail}
        />
        <div className="profile-modifier-buttons">
          <Button
            variant="outlined"
            color="white"
            sx={{ fontSize: "12px", padding: "2px", marginRight: "20px" }}
            onClick={handleNewEmail}
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
