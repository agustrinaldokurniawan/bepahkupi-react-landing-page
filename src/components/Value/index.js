import React from "react";

import LangUtils from "../../utils/lang";
import DeviceUtils from "../../utils/device";
import Data from "./data.json";

import team from "../../assets/icons/team.png";
import greenEarth from "../../assets/icons/greenEarth.png";
import farmer from "../../assets/icons/farmer.png";
import education from "../../assets/icons/innovation.png";
import innovation from "../../assets/icons/greenTech.png";

import { Swiper, SwiperSlide } from "swiper/react";

const Value = () => {
  const { lang } = LangUtils();
  const { screenWidth } = DeviceUtils();

  const icons = {
    innovationIcon: innovation,
    educationIcon: education,
    farmerIcon: farmer,
    greenEarthIcon: greenEarth,
    teamIcon: team,
  };

  const ValuesSlide = () => {
    return (
      <Swiper
        slidesPerView={screenWidth >= 768 ? "3.5" : "1.5"}
        spaceBetween={30}
        pagination={{ clickable: true }}
      >
        {Data[lang].values.map((item, key) => {
          return (
            <SwiperSlide
              key={key}
              className="pt-3 pb-3 m-2"
              style={{ width: "70%" }}
            >
              <div className="row m-0">
                <div className="col-12">
                  <img src={icons[item.icon]} width={50} alt={item.title} />
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
    <div
      className="row m-0 align-items-center justify-content-center text-center"
      style={{ backgroundColor: "#F6F6F6" }}
    >
      <div className="col-11 p-0 mt-5 mb-3">
        <h1>{Data[lang].title}</h1>
      </div>
      <div className="col-11 p-0">
        <div className="row m-0 justify-content-center text-center mb-5">
          <ValuesSlide />
        </div>
      </div>
    </div>
  );
};

export default Value;
