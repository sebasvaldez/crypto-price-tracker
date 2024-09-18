import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Navigate } from "react-router-dom"

export const PublicRoutes = ({children}) => {

    const {currentUser}= useContext(AuthContext);


  return !currentUser ? children : <Navigate to="/"/>;
}
