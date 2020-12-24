import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import LanguageChanger from "../Language";
import LangUtils from "../../utils/lang";

import Data from "./data.json";

const BigNav = (props) => {
  const { lang } = LangUtils();
  const [touchedMenu, setTouchedMenu] = useState();

  return (
    <div className="col-8 text-right p-0">
      <div className="row m-0 justify-content-between">
        <div className="col-8 text-center">
          {Data[lang].menu.map((item, key) => {
            return (
              <Link
                key={key}
                to={item.url}
                style={{
                  color: "white",
                  textDecoration: "none",
                  marginRight: 50,
                  borderBottom:
                    props.url === item.url || touchedMenu === item.name
                      ? "3px solid white"
                      : "",
                }}
                onMouseEnter={() => setTouchedMenu(item.name)}
                onMouseLeave={() => setTouchedMenu()}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div
          className="col-4"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#DC5708",
              color: "white",
              paddingLeft: 30,
              paddingRight: 30,
            }}
            onClick={() => window.open("/shop")}
          >
            {Data[lang].textButton}
          </Button>
          <LanguageChanger />
        </div>
      </div>
    </div>
  );
};

export default BigNav;
