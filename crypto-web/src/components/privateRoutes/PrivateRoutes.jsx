import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Spinner } from "../spinner/Spinner";

export const PrivateRoutes = ({ children }) => {
  // const [isLoading, setIsLoading] = useState(false);

  const { currentUser, activeUser, isLoading } = useContext(AuthContext);

  // useEffect(() => {
  //   if (activeUser) {
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(true);
  //   }
  // }, []);

  if (isLoading ) {
    return <Spinner />;
  }
  if(!currentUser){
    return <Navigate to="/login" />;
  }
  return children;
};
