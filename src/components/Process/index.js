import React from "react";

import LangUtils from "../../utils/lang";
import Data from "./data.json";

import harvest from "../../assets/images/harvest.png";
import sortationFruit from "../../assets/images/sortationFruit.png";
import peelingRed from "../../assets/images/peelingRed.png";
import fermentation from "../../assets/images/fermentation.png";
import sortationDrying from "../../assets/images/sortationDrying.png";
import peelingMark from "../../assets/images/peelingMark.png";
import packaging from "../../assets/images/packaging.png";
import drying from "../../assets/images/drying.png";

import { Swiper, SwiperSlide } from "swiper/react";

const Process = () => {
  const { lang } = LangUtils();

  const images = {
    harvest: harvest,
    sortationFruit: sortationFruit,
    peelingRed: peelingRed,
    drying: drying,
    fermentation: fermentation,
    sortationDrying: sortationDrying,
    peelingMark: peelingMark,
    packaging: packaging,
  };

  return (
    <div
      className="row m-0 align-items-center justify-content-center text-white mt-5 mb-5"
      style={{ backgroundColor: "#592F16" }}
    >
      <div className="col-11 p-0 mt-5 mb-3 text-center">
        <h1>{Data[lang].title}</h1>
      </div>
      <div className="col-11 p-0">
        <div className="row m-0 justify-content-center mb-5">
          <Swiper
            slidesPerView={"1"}
            spaceBetween={100}
            pagination={{ clickable: true }}
          >
            {Data[lang].content.map((item, key) => {
              return (
                <SwiperSlide key={key} className="col-12 pt-3 pb-3 pb-5">
                  <div className="row m-0 justify-content-center align-items-center">
                    <div
                      className="col-md-6 col-12 mb-md-0 mb-3"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        src={images[item.image]}
                        alt={item.title}
                        width={"100%"}
                      />
                    </div>
                    <div className="col-md-6 col-12 text-left">
                      <h3 className="text-left">{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Process;
