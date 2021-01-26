import React, { useState } from "react";

import LangUtils from "../../utils/lang";
import State from "../../utils/state";

import cart from "../../assets/icons/cart.png";
import heart from "../../assets/icons/heart.png";

import { TextField, InputAdornment, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import Auth from "../Auth";

import Data from "./data.json";

const BigNav = ({ products }) => {
  const { lang } = LangUtils();
  const {
    handleChangeSearchProduct,
    userSession,
    removeUserToSession,
  } = State();
  const [searchKey, setSearchKey] = useState("");

  const [modalState, setModalState] = useState({
    show: false,
    typeModal: "",
  });
  const { show } = modalState;

  const toggleModal = (type) => {
    setModalState({
      typeModal: type,
      show: !show,
    });
  };

  function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(" ");
    for (var i = 0; i < separateWord.length; i++) {
      separateWord[i] =
        separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(" ");
  }

  const handleChangeKey = (event) => {
    setSearchKey(event.target.value);
  };

  const handleKeyDown = (key) => (event) => {
    if (event.key === key) {
      handleChangeSearchProduct(searchKey);
    }
  };

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
      <div className="row m-0 justify-content-between align-items-center">
        <div className="col-6 text-center">
          <TextField
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
                  <SearchIcon fontSize="large" style={{ color: "#979797" }} />
                </InputAdornment>
              ),
            }}
          />

          <div
            style={{
              backgroundColor: "white",
              marginTop: 20,
              position: "absolute",
              width: 400,
              borderRadius: 30,
              maxHeight: 300,
              overflowY: "scroll",
            }}
          >
            {searchKey &&
              products &&
              products.map((item, key) => {
                return (
                  <a
                    href={`/product/${item.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      display: item.name
                        .toLowerCase()
                        .includes(searchKey.toLowerCase())
                        ? ""
                        : "none",
                    }}
                    key={key}
                  >
                    <div
                      className="row m-0 justify-content-center align-items-center m-3"
                      key={key}
                    >
                      <div className="col-4">
                        <img src={item.image} width={"80%"} alt={item.name} />
                      </div>
                      <div className="col-8">
                        <p style={{ fontWeight: 600, textAlign: "left" }}>
                          {capitalizeTheFirstLetterOfEachWord(item.name)}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
          </div>
        </div>
        <div className="col-6">
          <div className="row justify-content-between align-items-center">
            <div className="col-4">
              <div className="row m-0 justify-content-end align-items-center">
                <div className="col-12" style={{ height: "100%" }}>
                  <a href="/cart">
                    <img src={cart} width={30} alt="cart" />
                  </a>
                </div>
                {/* <div className="col-6">
                  <a href="/wishlist">
                    <img src={heart} width={30} alt="cart" />
                  </a>
                </div> */}
              </div>
            </div>
            {!userSession && (
              <div className="col-4">
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
              </div>
            )}

            {!userSession && (
              <div className="col-4">
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
            )}

            {userSession && (
              <div
                className="col-6"
                style={{ display: "flex", justifyContent: "flex-end" }}
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
                      onClick={() => (window.location.href = "/order")}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigNav;
