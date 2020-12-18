import React from "react";

import LangUtils from "../../utils/lang";
import Data from "./data.json";
import RenderHTML from "react-render-html";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

const TermOfService = () => {
  const { lang } = LangUtils();
  return (
    <div className="row m-0 ">
      <Nav />
      <div className="col-12 p-0" style={{ marginTop: 100, marginBottom: 100 }}>
        <div className="row m-0 justify-content-center align-items-center">
          <div className="col-10">{RenderHTML(Data[lang].data)}</div>
        </div>
      </div>
      <div className="col-12 p-0">
        <Footer />
      </div>
    </div>
  );
};

export default TermOfService;
