import React, { useState } from "react";

import LangUtils from "../../utils/lang";
import Data from "./data.json";

import emailIcon from "../../assets/icons/emailBlack.png";
import whatsapp from "../../assets/icons/whatsappBlack.png";
import map from "../../assets/icons/mapBlack.png";
import contactImage from "../../assets/images/contact.png";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PopupNotif from "../../components/PopupNotif";

import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";

import { Typography, TextField, Button } from "@material-ui/core";

const Contact = () => {
  const [modalState, setModalState] = useState({
    show: false,
    status: "",
    messageModal: "",
    title: "",
  });

  const { lang } = LangUtils();

  const [state, setState] = useState({
    email: "",
    name: "",
    message: "",
  });

  const [phoneNumber, setPhoneNumber] = useState();

  const { email, name, message } = state;
  const { show, status, messageModal, title } = modalState;

  const icons = {
    email: emailIcon,
    whatsapp: whatsapp,
    map: map,
  };

  const onChangeHandler = (value, key) => {
    setState({ ...state, [key]: value });
  };

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
      ) &&
      isPossiblePhoneNumber(phoneNumber) == true &&
      name.match(/^[A-Za-z]+$/) &&
      message
    ) {
      return toggleData("success");
    }
    return toggleData("error");
  };

  return (
    <div className="row m-0 justify-content-center">
      <PopupNotif
        show={show}
        status={status}
        title={title}
        message={messageModal}
        toggleModal={toggleModal}
      />
      <Nav />
      <div className="col-11 p-0" style={{ marginTop: 120 }}>
        <div className="row m-0 justify-content-center align-items-center  mb-5">
          <div className="col-lg-5 col-11 p-0 mb-3 text-center">
            <h1>{Data[lang].title}</h1>
            <Button
              onClick={() =>
                (window.location.href = "https://goo.gl/maps/oLjd7GAd69XKPDPf6")
              }
            >
              <img
                src={contactImage}
                alt="contact"
                className="mt-5 mb-5"
                width={"80%"}
              />
            </Button>
            {Data[lang].informations.map((item, key) => {
              return (
                <div
                  className="row m-0"
                  key={key}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="col-1">
                    <img src={icons[item.icon]} alt={item.icon} />
                  </div>
                  <div className="col-lg-6 col-10">
                    <Typography className="mb-4" align="left">
                      {item.value}
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-lg-4 col-10 p-0 ">
            <form
              noValidate
              autoComplete="off"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 30,
                fontSize: 16,
              }}
            >
              <TextField
                id="outlined-basic"
                label={Data[lang].form.name}
                variant="outlined"
                type="text"
                value={name}
                onChange={(e) => onChangeHandler(e.target.value, "name")}
              />
              <PhoneInput
                defaultCountry="ID"
                placeholder={Data[lang].form.phoneNumber}
                style={{ fontSize: 20 }}
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
              <TextField
                id="outlined-basic"
                label={Data[lang].form.email}
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => onChangeHandler(e.target.value, "email")}
              />
              <TextField
                multiline
                rows={5}
                id="outlined-basic"
                label={Data[lang].form.message}
                variant="outlined"
                value={message}
                onChange={(e) => onChangeHandler(e.target.value, "message")}
              />
              <Button
                onClick={onSubmit}
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#DC5708",
                  paddingLeft: 50,
                  paddingRight: 50,
                  width: "50%",
                  alignSelf: "center",
                }}
              >
                {Data[lang].form.textSubmit}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-12 p-0">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
