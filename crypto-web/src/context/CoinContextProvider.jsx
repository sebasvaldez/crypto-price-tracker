import { useEffect, useState } from "react";
import { CoinContext } from "./CoinContext";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  
  deleteDoc,
} from "firebase/firestore";

export const CoinContextProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({ name: "usd", symbol: " US$" });
  const [favoritesCoins, setFavoritesCoins] = useState([]);
  const [coinData, setCoinData] = useState();

  const fetchAllCoins = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-ShVMZ9Z1v1J9XYjMukcapti7",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&per_page=200`,
      options
    )
      .then((response) => response.json())
      .then((response) => setAllCoins(response))
      .catch((err) => console.error(err));
  };

  const fetchCoin = async (id) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-ShVMZ9Z1v1J9XYjMukcapti7",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };

  const addFavoriteCoin = async (coinId) => {
    const db = getFirestore();
    const user = getAuth().currentUser;

    try {
      if (user) {
        const favoritesRef = doc(db, "users", user.uid, "favorites", coinId);
        await setDoc(favoritesRef, { coinId });
        getFavoritesCoins();
      }
      console.log(`Moneda ${coinId} agregada a favoritos con éxito.`);
    } catch (error) {
      console.error("Error al agregar la moneda a favoritos:", error.message);
    }
  };

  const deleteFavoritecoin = async (coinId) => {
    const db = getFirestore();
    const user = getAuth().currentUser;
    try {
      if (user) {
        const favoritesRef = doc(db, "users", user.uid, "favorites", coinId);
        await deleteDoc(favoritesRef);
        getFavoritesCoins();
      }
    } catch (error) {
      console.error("Error al eliminar la moneda de favoritos:", error.message);
    }
  };

  const getFavoritesCoins = async () => {
    const db = getFirestore();
    const user = getAuth().currentUser;
    try {
      if (user) {
        const collectionRef = collection(db, "users", user.uid, "favorites");
        const favoritesSnapshot = await getDocs(collectionRef);
        const favorites = favoritesSnapshot.docs.map((doc) => doc.data());
        setFavoritesCoins(favorites);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
    } catch (error) {
      console.error("Error al obtener las monedas favoritas:", error.message);
    }
  };

  useEffect(() => {
    fetchAllCoins();
  }, [currency]);

  useEffect(() => {
    if (getAuth().currentUser) {
      getFavoritesCoins();
    }
  }, []);

  useEffect(() => {
    const storagefavorites = localStorage.getItem("favorites");
    if (storagefavorites) {
      setFavoritesCoins(JSON.parse(storagefavorites));
    }
  }, []);

  const contextValue = {
    allCoins,
    currency,
    setCurrency,
    addFavoriteCoin,
    deleteFavoritecoin,
    favoritesCoins,
    getFavoritesCoins,
    fetchCoin,
    coinData,
  };

  return (
    <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
  );
};
