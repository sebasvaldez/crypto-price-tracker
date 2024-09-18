import { useEffect, useState, useContext, act } from "react";
import { AuthContext } from "./AuthContext";
import { fireBaseAuth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc, } from "firebase/firestore";


export const AuthContextProvider = ({ children }) => {


  const db = getFirestore();

  const [currentUser, setCurrentUser] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

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
      console.log(error);
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
        setCurrentUser(userData);

      } else {
        console.log("No se encontraron datos del usuario en Firestore.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const respGoogle = new GoogleAuthProvider();
      const resp = await signInWithPopup(fireBaseAuth, respGoogle);
      console.log(resp);
      return resp;
    } catch (error) {}
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

  const contextValue = {
    registerUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
    currentUser,
    activeUser,
  };


  useEffect(() => {
    const suscribed = onAuthStateChanged(fireBaseAuth, (user) => {
      if (!user) {
        setActiveUser(null);
      } else {
        setActiveUser(user);
        // console.log(user);
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
