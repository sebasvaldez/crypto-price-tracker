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
  deleteUser,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { CoinContext } from "./CoinContext";

export const AuthContextProvider = ({ children }) => {
  const { getFavoritesCoins } = useContext(CoinContext);

  const db = getFirestore();

  const [currentUser, setCurrentUser] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [error, setError] = useState(null);
  const [activeUserError, setActiveUserError] = useState(null);

  const registerUser = async (name, email, password) => {
    if (name == "" || email == "" || password == "") {
      setError("Todos los campos son obligatorios");
      return;
    } else if (name.length < 6) {
      setError("El nombre debe tener al menos 6 caracteres");
      return;
    }
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
      return user;
    } catch (error) {
      setError(error.code);
    }
  };

  const loginUser = async (email, password) => {
    if (email === "" || password === "") {
      setError("Todos los campos son obligatorios");
      return;
    }
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
      setError(error.code);
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

  const updateUserPassword = async (currentPassword, newPassword) => {
    setError(null);
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
      setError(error.message);
      console.error("Error al actualizar la contraseña:", error);
      if (error.code === "auth/wrong-password") {
        console.log("La contraseña actual es incorrecta.");
      } else if (error.code === "auth/network-request-failed") {
        console.log(
          "Ha ocurrido un error de conexión. Por favor, verifica tu conexión a internet e inténtalo de nuevo."
        );
      } else {
        console.log(
          "Ocurrió un error inesperado. Por favor, intenta más tarde."
        );
      }
    }
  };

  const deleteUserAccount = async (currentPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    try {
      await reauthenticateWithCredential(user, credential);

      const userDocRef = doc(db, "users", user.uid);
      await deleteDoc(userDocRef);
      await deleteUser(user);

      logoutUser();
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
      if (error.code === "auth/invalid-credential") {
        setError("La contraseña ingresada es incorrecta.");
      } else if (error.code === "auth/network-request-failed") {
        setError(
          "Ha ocurrido un error de conexión. Por favor, verifica tu conexión a internet e inténtalo de nuevo."
        );
      } else if (error.code === "auth/missing-password") {
        setError(
          "Debes ingresar tu contraseña actual para eliminar tu cuenta."
        );
      } else {
        setError("Ocurrió un error inesperado. Por favor, intenta más tarde.");
      }
    }
  };

  const handleErrorTranslator = (error) => {
    switch (error) {
      case "auth/invalid-credential":
        return "Credenciales inválidas";
      case "auth/missing-password":
        return "debe escribir una contraseña";
      case "auth/invalid-email":
        return "Email inválido";
      case "auth/weak-password":
        return "Contraseña débil, debe tener al menos 6 caracteres";
      case "auth/email-already-in-use":
        return "Email ya registrado";
      case "auth/too-many-requests":
        return "Demasiados intentos fallidos, intente más tarde";
      default:
        return error;
    }
  };

  //console.log(error);

  const contextValue = {
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
    activeUser,
    setError,
    error,
    updateUserPassword,
    deleteUserAccount,
    handleErrorTranslator,
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
