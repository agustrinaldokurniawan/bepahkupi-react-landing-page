import React, { useState, useEffect } from "react";

import utils from "../../utils/device";
import BigNav from "./bigNav";
import CollapseNav from "./collapseNav";
import Logo from "../../assets/icons/logo.png";

import Axios from "axios";

const Nav = () => {
  const { screenWidth } = utils();
  const [url, setUrl] = useState(window.location.pathname);

  useEffect(() => {
    fetchProducts();
    setUrl(window.location.pathname);
  }, []);

  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    Axios.get(`${process.env.REACT_APP_API}/user/product/readAll`)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) =>
        console.log("Error while fetching product data from server")
      );
  };

  return (
    <div
      className="pl-lg-5 pl-lg-5 pl-2 pr-2 pt-3 pb-3"
      style={{
        backgroundColor: "white",
        filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.25))",
        position: "fixed",
        width: "100%",
        zIndex: 10,
      }}
    >
      <div className="ml-lg-5 mr-lg-5 row align-items-center justify-content-center m-0 ">
        <div className="col-3 float-left">
          <img
            src={Logo}
            alt="Bepahkupi"
            width={screenWidth / 5 > 100 ? screenWidth / 7 : 100}
            style={{ cursor: "pointer" }}
            onClick={() => (window.location = "/")}
          />
        </div>
        <div className="col-8">
          {screenWidth > 600 ? (
            <BigNav url={url} products={products} />
          ) : (
            <CollapseNav url={url} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
