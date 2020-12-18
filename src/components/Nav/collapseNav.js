import React, { useState } from "react";

import MenuIcon from "../../assets/icons/menu.png";
import CloseIcon from "../../assets/icons/close.png";

import Drawer from "@material-ui/core/Drawer";
import { Button } from "@material-ui/core";
import LangUtils from "../../utils/lang";
import { Link } from "react-router-dom";
import Data from "./data.json";
import LanguageChanger from "../Language";

const CollapseNav = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [touchedMenu, setTouchedMenu] = useState();
  const { lang } = LangUtils();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setShowMenu(false);
  };

  return (
    <div className="col-8 text-right p-0">
      <React.Fragment key={"right"}>
        <img
          src={MenuIcon}
          alt="Bepahkupi"
          width={50}
          onClick={() => setShowMenu(!showMenu)}
          style={{ cursor: "pointer", float: "right" }}
        />
        <Drawer
          anchor={"right"}
          open={showMenu}
          onClose={toggleDrawer("right", false)}
        >
          <div
            className="row m-0 align-items-center justify-content-center"
            style={{ height: "100%" }}
          >
            <div className="col-2 p-0">
              <Button
                onClick={() => setShowMenu(!showMenu)}
                style={{
                  backgroundColor: "transparent",
                  width: 70,
                  height: 70,
                  borderRadius: 100,
                  position: "absolute",
                  top: 0,
                  border: "3px solid black",
                  marginLeft: 10,
                  marginTop: 10,
                }}
              >
                <img src={CloseIcon} width={40} alt="Close" />
              </Button>
              <p
                style={{ textOrientation: "mixed", writingMode: "vertical-rl" }}
              >
                {Data[lang].motto}
              </p>
            </div>
            <div className="col-10 p-0">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: "100%",
                  marginRight: 100,
                  marginLeft: 100,
                }}
              >
                {Data[lang].menu.map((item, key) => {
                  return (
                    <Link
                      key={key}
                      to={item.url}
                      style={{
                        color: "black",
                        textDecoration: "none",
                        marginRight: 50,
                        fontSize: 30,
                        marginBottom: 20,
                        fontWeight:
                          props.url === item.url || touchedMenu == item.name
                            ? "400"
                            : "200",
                      }}
                      onMouseEnter={() => setTouchedMenu(item.name)}
                      onMouseLeave={() => setTouchedMenu()}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "#DC5708",
                    color: "white",
                    paddingLeft: 30,
                    paddingRight: 30,
                    marginBottom: 30,
                  }}
                >
                  {Data[lang].textButton}
                </Button>
                <LanguageChanger color="black" direction="up" />
              </div>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default CollapseNav;
