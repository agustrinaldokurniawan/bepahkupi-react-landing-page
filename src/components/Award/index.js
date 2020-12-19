import React from "react";

import LangUtils from "../../utils/lang";
import DeviceUtils from "../../utils/device";
import Data from "./data.json";

import startupTurkey from "../../assets/icons/startupTurkey.png";
import dilo from "../../assets/icons/dilo.png";
import indigo from "../../assets/icons/indigo.png";
import korean from "../../assets/icons/korean.png";
import techToImpact from "../../assets/icons/techToImpact.png";

import { Swiper, SwiperSlide } from "swiper/react";

const Award = () => {
  const { lang } = LangUtils();
  const { screenWidth } = DeviceUtils();

  const icons = {
    startupTurkey: startupTurkey,
    dilo: dilo,
    indigo: indigo,
    korean: korean,
    techToImpact: techToImpact,
  };

  const AwardSlide = () => {
    return (
      <Swiper
        slidesPerView={screenWidth >= 768 ? "3.5" : "1.5"}
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {Data[lang].awards.map((item, key) => {
          return (
            <SwiperSlide
              key={key}
              className="pt-3 mt-3 mb-5"
              style={{ width: "70%" }}
            >
              <div className="row m-0">
                <div className="col-12">
                  <img src={icons[item.icon]} alt={item.title} width={"50%"} />
                </div>
                <div className="col-12 mt-5">
                  <h6 style={{ fontWeight: 600 }}>{item.title}</h6>
                </div>
                <div className="col-12">
                  <p style={{ fontSize: "13px" }}>{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };

  return (
    <div className="row m-0 justify-content-center align-items-center text-center mt-5 mb-5">
      <div className="col-12 p-0 mt-5">
        <h1>{Data[lang].title}</h1>
      </div>
      <div className="col-12 p-0">
        <AwardSlide />
      </div>
    </div>
  );
};

export default Award;
