import React, { useState, useEffect } from "react";

import utils from "../../utils/device";
import BigNav from "./bigNav";
import CollapseNav from "./collapseNav";
import Logo from "../../assets/icons/logo.png";

const Nav = (props) => {
  const { screenWidth } = utils();
  const [url, setUrl] = useState(window.location.pathname);

  useEffect(() => {
    setUrl(window.location.pathname);
  }, []);

  return (
    <div
      className="pl-lg-5 pl-lg-5 pl-2 pr-2 pt-3 pb-3"
      style={{
        backgroundColor: "rgba(53, 30, 16, 0.5)",
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
            width={screenWidth / 5 > 100 ? screenWidth / 7 : 200}
            style={{ cursor: "pointer" }}
            onClick={() => (window.location = "/")}
          />
        </div>
        {screenWidth > 1280 ? <BigNav url={url} /> : <CollapseNav url={url} />}
      </div>
    </div>
  );
};

export default Nav;
