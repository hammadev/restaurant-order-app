import '../styles/globals.css'
import React, { useEffect, useState } from "react";
import GlobalStateContext from './contexts/GlobalContext';

function MyApp({ Component, pageProps }) {

  const [selectedItem, setSelectedItem] = useState({});
  const [CartItems, setCartItems] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);

  return (
      <GlobalStateContext.Provider value={{ selectedItem, setSelectedItem, isShowModal, setIsShowModal, CartItems, setCartItems }}>
        <Component {...pageProps} />
      </GlobalStateContext.Provider>
  ); 
}

export default MyApp