import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const [isLoading, setIsLoading, ] = useState(false);

  const { currentUser } = useContext(AuthContext);
 

  useEffect(() => {
    if (currentUser) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  } else {
    return currentUser ? children : <Navigate to="/login" />;
  }
};
