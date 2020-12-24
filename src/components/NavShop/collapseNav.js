import React, { useState } from "react";

import MenuIcon from "../../assets/icons/menuBlack.png";
import CloseIcon from "../../assets/icons/close.png";

import Drawer from "@material-ui/core/Drawer";
import LangUtils from "../../utils/lang";
import State from "../../utils/state";
import Data from "./data.json";

import cart from "../../assets/icons/cart.png";
// import cartFill from "../../assets/icons/cartFill.png";
import heart from "../../assets/icons/heart.png";

import { TextField, InputAdornment, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import Auth from "../Auth";

const CollapseNav = (props) => {
  const {
    handleChangeSearchProduct,
    userSession,
    removeUserToSession,
  } = State();
  const [showMenu, setShowMenu] = useState(false);
  const [searchKey, setSearchKey] = useState();
  const { lang } = LangUtils();

  const [modalState, setModalState] = useState({
    show: false,
    typeModal: "signup",
  });
  const { show } = modalState;

  const toggleModal = (type) => {
    setModalState({
      show: !show,
      typeModal: type,
    });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setShowMenu(false);
  };

  const handleChangeKey = (event) => {
    setSearchKey(event.target.value);
  };

  const handleKeyDown = (key) => (event) => {
    if (event.key === key) {
      handleChangeSearchProduct(searchKey);
    }
  };

  const [touchedMenu, setTouchedMenu] = useState();
  const onSubmit = () => {
    handleChangeSearchProduct(searchKey);
  };

  const logout = () => {
    removeUserToSession();
    window.location.reload();
  };

  const ContentAuth = () => {
    return (
      <Auth
        typeModal={modalState.typeModal}
        show={show}
        toggleModal={toggleModal}
      />
    );
  };
  return (
    <div className="col-12 text-right p-0">
      <ContentAuth />
      <React.Fragment key={"right"}>
        <div className="row justify-content-end align-items-center">
          <div
            className="col-8 p-0"
            style={{ display: "flex", justifyContent: "flex-end", gap: 30 }}
          >
            <a href="/cart">
              <img src={cart} width={20} alt="cart" />
            </a>
            {/* <a href="/wishlist">
              <img src={heart} width={20} alt="cart" />
            </a> */}
          </div>

          <div className="col-4">
            <img
              src={MenuIcon}
              alt="Bepahkupi"
              width={30}
              onClick={() => setShowMenu(!showMenu)}
              style={{ cursor: "pointer", float: "right" }}
            />
          </div>
        </div>

        <Drawer
          anchor={"right"}
          open={showMenu}
          onClose={toggleDrawer("right", false)}
        >
          <div
            className="row m-0 align-items-center justify-content-center"
            style={{ height: "100%", width: 300 }}
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
                  marginRight: 20,
                  marginLeft: 20,
                }}
              >
                {/* <TextField
                  id="outlined-basic"
                  label={Data[lang].searchBar}
                  variant="standard"
                  value={searchKey}
                  onChange={handleChangeKey}
                  style={{ width: "100%" }}
                  onKeyDown={handleKeyDown("Enter")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={onSubmit}
                        style={{ cursor: "pointer" }}
                      >
                        <SearchIcon
                          fontSize="large"
                          style={{ color: "#979797" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                /> */}
                {userSession && (
                  <div
                    className="col-12 mb-5"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div className={`btn-group  ${"dropdown"}`}>
                      <button
                        type="button"
                        className="btn btn-secondary dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: "none",
                          color: "black",
                          backgroundColor: "white",
                        }}
                      >
                        <span style={{ marginRight: 10 }}>
                          Hai, {userSession.name}
                        </span>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end mt-3 p-2">
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => alert("order")}
                        >
                          Orders History
                        </li>
                        <li
                          style={{ cursor: "pointer", marginTop: 10 }}
                          onClick={() => logout()}
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                {Data["en"].menu.map((item, key) => {
                  return (
                    <a
                      key={key}
                      href={
                        item.url == "/"
                          ? item.url
                          : `https://www.bepahkupi.com${item.url}`
                      }
                      style={{
                        color: "black",
                        textDecoration: "none",
                        marginRight: 50,
                        fontSize: 30,
                        marginBottom: 20,
                        whiteSpace: "nowrap",
                        fontWeight:
                          props.url === item.url || touchedMenu == item.name
                            ? "400"
                            : "200",
                      }}
                      onMouseEnter={() => setTouchedMenu(item.name)}
                      onMouseLeave={() => setTouchedMenu()}
                    >
                      {item.name}
                    </a>
                  );
                })}

                {!userSession && (
                  <div className="col-12 mt-5">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        border: "2px solid #DC5708",
                        backgroundColor: "white",
                        color: "black",
                        paddingLeft: 30,
                        paddingRight: 30,
                        width: "100%",
                      }}
                      onClick={() => {
                        toggleModal("login");
                      }}
                    >
                      {Data[lang].login}
                    </Button>

                    <div className="col-12 mt-5">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          backgroundColor: "#DC5708",
                          color: "white",
                          paddingLeft: 30,
                          paddingRight: 30,
                          width: "100%",
                        }}
                        onClick={() => {
                          toggleModal("signup");
                        }}
                      >
                        Signup
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default CollapseNav;
