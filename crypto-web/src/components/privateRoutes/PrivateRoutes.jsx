import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { activeUser } = useContext(AuthContext);

  useEffect(() => {
    if (activeUser) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [activeUser]);

  if (isLoading) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  } else {
    return activeUser ? children : <Navigate to="/login" />;
  }
};
