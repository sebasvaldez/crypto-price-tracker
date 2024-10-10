import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMediaQuery, Box } from "@mui/material";
import {
  UserMail,
  UserPassword,
  UserDeleteAccount,
} from "../../components/profile/index";

import "./ProfilePage.css";

export const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);

  const isMedium = useMediaQuery("(min-width:768px)");

  return (
    <div className="profile-box" sx={{ margin: "20px", padding: "20px" }}>
      <h2 className="profile-title">
        Inicio de sesión y seguridad de {currentUser?.name}
      </h2>

      {/* <UserMail currentUser={currentUser} isMedium={isMedium} /> */}

      <UserPassword isMedium={isMedium} />

      <UserDeleteAccount isMedium={isMedium} />
    </div>
  );
};
