import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { fireBaseAuth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
  updateEmail,
  EmailAuthProvider,
  updatePassword,
  reauthenticateWithCredential,
} from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import { CoinContext } from "./CoinContext";

export const AuthContextProvider = ({ children }) => {
  const { getFavoritesCoins } = useContext(CoinContext);

  const db = getFirestore();

  const [currentUser, setCurrentUser] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [error, setError] = useState(null);
  const [activeUserError, setActiveUserError] = useState(null);

  const registerUser = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        fireBaseAuth,
        email,
        password
      );
      const user = userCredential.user;

      //guardar info adicional en firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        uid: user.uid,
      });
      logoutUser();
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      setError(error.message);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        fireBaseAuth,
        email,
        password
      );
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("favorites", JSON.stringify(userData.favorites));
        setCurrentUser(userData);
        getFavoritesCoins();
      } else {
        console.log("No se encontraron datos del usuario en Firestore.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setError(error.message);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(fireBaseAuth);
      localStorage.removeItem("user");
      localStorage.removeItem("favorites");
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const comparePasswords = (currentPassword, newPassword) => {
    if (currentPassword == newPassword) {
      return true;
    } else {
      return false;
    }
  };

  const updateUserPassword = async (currentPassword, newPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      console.log("Contraseña actualizada correctamente");
      logoutUser();
    } catch (error) {
      console.error("Error al actualizar contraseña:", error);
      setError(error.message);
    }
  };
  // console.log(error)

  const contextValue = {
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
    activeUser,
    setError,
    error,
    updateUserPassword,
    comparePasswords,
  };

  useEffect(() => {
    const suscribed = onAuthStateChanged(fireBaseAuth, (user) => {
      if (!user) {
        setActiveUser(null);
      } else {
        setActiveUser(user);
        setError(null);
      }
    });
    return () => suscribed();
  }, []);

  useEffect(() => {
    const storageUser = localStorage.getItem("user");

    if (storageUser) {
      const user = JSON.parse(storageUser);
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
