import { useState } from "react";

const State = () => {
  const [searchProduct, setSearchProduct] = useState();
  const userSession =
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : false;

  const setUserToSession = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUserToSession = (user) => {
    localStorage.removeItem("user");
  };

  const handleChangeSearchProduct = (key) => {
    console.log(key);
    setSearchProduct(key);
  };

  return {
    searchProduct,
    handleChangeSearchProduct,
    setUserToSession,
    userSession,
    removeUserToSession,
  };
};

export default State;
