import { useState } from "react";
import {
    Button,
    Collapse,
    TextField,
  } from "@mui/material";

export const UserDeleteAccount = ({isMedium}) => {
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);

    
  const handleInputdeleteAccount = () => {
    setShowDeleteAccount(!showDeleteAccount);
  };
  return (
    <div className="profile-delete">
      <div>
        <h4>Eliminar cuenta</h4>
        <p>Esta cuenta dejará de estar disponible y los datos</p>
        <p>guardados se eliminarán permanentemente.</p>
      </div>

      <Button
        variant="outlined"
        color="error"
        sx={{ margin: "10px", paddingX: "70px" }}
        onClick={handleInputdeleteAccount}
      >
        Eliminar cuenta
      </Button>
      <Collapse
        in={showDeleteAccount}
        timeout={300}
        className="profile-collapse"
      >
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
            eliminar cuenta
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
