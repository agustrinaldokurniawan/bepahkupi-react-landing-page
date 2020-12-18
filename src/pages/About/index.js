import React, { useState } from "react";

import LangUtils from "../../utils/lang";
import Data from "./data.json";

import wiga from "../../assets/images/wiga.png";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Jumbotron from "../../components/Jumbotron";
import Provide from "../../components/Provide";
import Team from "../../components/Team";

const About = () => {
  const { lang } = LangUtils();

  return (
    <div className="row m-0">
      <Nav />
      <div className="col-12 p-0">
        <Jumbotron
          title={Data[lang].title}
          description={Data[lang].description}
          menuDown={{ link: "/about#bepahkupi-founded", status: true }}
          button={{ status: false }}
        />
      </div>
      <div className="col-12 p-0 pt-5 mb-5" id="bepahkupi-founded">
        <div className="row m-0 justify-content-center align-items-center">
          <div className="col-lg-5 col-11 text-center mt-5">
            <img src={wiga} alt="CEO Bepahkupi" />
          </div>
          <div className="col-lg-5 col-11 mt-5">
            <h3>{Data[lang].bepahkupi.title}</h3>
            <p>{Data[lang].bepahkupi.description}</p>
          </div>
        </div>
      </div>
      <div className="col-12 p-0">
        <Provide />
      </div>
      <div className="col-12 p-0">
        <Team />
      </div>
      <div className="col-12 p-0">
        <Footer />
      </div>
    </div>
  );
};

export default About;
