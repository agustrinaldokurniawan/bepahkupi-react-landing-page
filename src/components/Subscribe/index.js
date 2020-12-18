import React, { useState } from "react";

import Lang from "../../utils/lang";
import Data from "./data.json";

import { InputAdornment, TextField, Button } from "@material-ui/core";
import PopupNotif from "../../components/PopupNotif";

const Subscribe = () => {
  const { lang } = Lang();
  const [email, setEmail] = useState("");

  const [modalState, setModalState] = useState({
    show: false,
    status: "",
    messageModal: "",
    title: "",
  });
  const { show, status, messageModal, title } = modalState;

  const onSubmit = () => {
    toggleModal();
  };

  const toggleData = (status) => {
    setModalState({
      show: !show,
      status,
      title: Data[lang][status].title,
      messageModal: Data[lang][status].message,
    });
  };

  const toggleModal = () => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return toggleData("success");
    }
    return toggleData("error");
  };

  return (
    <div
      className="row m-0 justify-content-center align-items-center text-white pt-3 pb-3"
      style={{ backgroundColor: "#592F16" }}
    >
      <PopupNotif
        show={show}
        status={status}
        title={title}
        message={messageModal}
        toggleModal={toggleModal}
      />
      <div className="col-11 p-0">
        <div className="row m-0 justify-content-between align-items-center">
          <div className="col-md-6 col-12">
            <h1 style={{ fontSize: 50, fontWeight: "300" }}>
              {Data[lang].title}
            </h1>
            <p>{Data[lang].description}</p>
          </div>
          <div className="col-md-6 col-12">
            <TextField
              id="subscribe"
              label="Your email"
              variant="filled"
              color="primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ backgroundColor: "white", width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ backgroundColor: "#DC5708" }}
                      onClick={onSubmit}
                    >
                      {Data[lang].textButton}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
