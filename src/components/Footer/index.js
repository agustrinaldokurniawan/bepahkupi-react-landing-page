import React from "react";

import LangUtils from "../../utils/lang";
import Data from "./data.json";

import logo from "../../assets/icons/logo.png";
import twitter from "../../assets/icons/twitter.png";
import facebook from "../../assets/icons/facebook.png";
import instagram from "../../assets/icons/instagram.png";
import youtube from "../../assets/icons/youtube.png";
import email from "../../assets/icons/email.png";
import whatsapp from "../../assets/icons/whatsapp.png";
import map from "../../assets/icons/map.png";

import { Link, Typography } from "@material-ui/core";

import LanguageChanger from "../Language";

const Footer = () => {
  const { lang } = LangUtils();

  const icons = {
    logo: logo,
    twitter: twitter,
    facebook: facebook,
    instagram: instagram,
    youtube: youtube,
    email: email,
    whatsapp: whatsapp,
    map: map,
  };

  return (
    <div
      className="row m-0 justify-content-center align-items-center text-white"
      style={{ backgroundColor: "#351C0D" }}
    >
      <div className="col-11 p-0 pt-5 pb-5">
        <div className="row m-0 justify-content-center">
          <div
            className="col-md-3 col-12 text-center mt-5"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={logo} width={"50%"} alt="Bepahkupi" />
          </div>

          <div className="col-md-3 col-12 mt-5">
            <h3 className="mb-5">{Data[lang].contact.title}</h3>
            {Data[lang].contact.contacts.map((item, key) => {
              return (
                <div className="row m-0" key={key}>
                  <div className="col-2">
                    <img src={icons[item.icon]} width={"60%"} alt={item.icon} />
                  </div>
                  <div className="col-10">
                    <Typography className="mb-4">{item.value}</Typography>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-md-3 col-12 mt-5">
            <h3 className="mb-5">{Data[lang].store.title}</h3>
            {Data[lang].store.stores.map((item, key) => {
              return (
                <Typography className="mb-4" key={key}>
                  <Link
                    href={item.url}
                    variant="body1"
                    color="inherit"
                    target="_blank"
                    rel="noopener"
                  >
                    {item.name}
                  </Link>
                </Typography>
              );
            })}
          </div>

          <div className="col-md-3 col-12 mt-5">
            <h3 className="mb-5">{Data[lang].socialMedia.title}</h3>
            <p>{Data[lang].socialMedia.description}</p>
            <div className="row m-0 justify-content-center align-items-center">
              {Data[lang].socialMedia.socials.map((item, key) => {
                return (
                  <div className="col-3" key={key}>
                    <Link href={item.url} target="_blank" rel="noopener">
                      <img
                        src={icons[item.icon]}
                        width={"40%"}
                        alt={item.icon}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 p-4" style={{ backgroundColor: "#201108" }}>
        <div className="row m-0  align-items-center">
          <div className="col-md-4 col-12 p-0">
            <p>{Data[lang].footer.copyright}</p>
          </div>
          <div className="col-md-4 col-12 p-0">
            <div className="row m-0 ">
              {Data[lang].footer.menu.map((item, key) => {
                return (
                  <div className="col-md-5" key={key}>
                    <Typography className="mb-4">
                      <Link href={item.url} color="inherit">
                        {item.title}
                      </Link>
                    </Typography>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="col-md-4 col-12 p-0"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <LanguageChanger direction="up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
