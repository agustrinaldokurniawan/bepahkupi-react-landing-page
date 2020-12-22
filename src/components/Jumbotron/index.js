import React from "react";

import LangUtils from "../../utils/lang";
import Data from "./data.json";

import imageJumbotron from "../../assets/images/jumbotron.png";
import arrowDownIcon from "../../assets/icons/arrowDown.png";

import Button from "@material-ui/core/Button";

const Jumbotron = ({ title, description, menuDown, button, image }) => {
  const { lang } = LangUtils();

  return (
    <div
      className="row m-0 align-items-center justify-content-center text-center text-white"
      style={{
        height: "85vh",
        backgroundImage: `url(${image ? image : imageJumbotron})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(89,47,22,0.85)",
          height: "100%",
          zIndex: 1,
        }}
      />
      <div className="col-11 p-0" style={{ zIndex: 2 }}>
        <div className="row m-0 justify-content-center">
          <div className="col-12">
            <h1>{title ? title : Data[lang].title}</h1>
          </div>
          <div
            className="col-md-6 col-11"
            style={{ fontWeight: 300, fontSize: 20 }}
          >
            <p>{description ? description : Data[lang].description}</p>
          </div>
          <div className="col-11" style={{ fontWeight: 300, fontSize: 20 }}>
            {button && button.status && (
              <Button
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#DC5708",
                  paddingLeft: 50,
                  paddingRight: 50,
                }}
                onClick={() => window.open(button.link)}
              >
                {button.text ? button.text : Data[lang].textButton}
              </Button>
            )}
          </div>
        </div>
      </div>
      {menuDown && menuDown.status && (
        <Button
          style={{
            backgroundColor: "#592F16",
            width: 70,
            height: 70,
            borderRadius: 100,
            position: "absolute",
            bottom: -35,
            border: "5px solid #F6F6F6",
            zIndex: 3,
          }}
          onClick={() =>
            (window.location.href = menuDown.link ? menuDown.link : "#")
          }
        >
          <img src={arrowDownIcon} width={40} alt="see-more" />
        </Button>
      )}
    </div>
  );
};

export default Jumbotron;
