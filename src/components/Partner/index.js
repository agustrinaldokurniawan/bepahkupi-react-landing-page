import React from "react";

import LangUtils from "../../utils/lang";
import DeviceUtils from "../../utils/device";
import Data from "./data.json";

import pertanian from "../../assets/icons/pertanian.png";
import ecodoe from "../../assets/icons/ecodoe.png";
import telkom from "../../assets/icons/telkom.png";
import indigo from "../../assets/icons/indigo.png";
import ub from "../../assets/icons/ub.png";
import aws from "../../assets/icons/aws.png";

import { Swiper, SwiperSlide } from "swiper/react";

const Partner = () => {
  const { lang } = LangUtils();
  const { screenWidth } = DeviceUtils();

  const icons = {
    pertanian: pertanian,
    ecodoe: ecodoe,
    indigo: indigo,
    telkom: telkom,
    ub: ub,
    aws: aws,
  };

  const PartnerSlide = () => {
    return (
      <Swiper
        slidesPerView={screenWidth >= 768 ? "3.5" : "1.5"}
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop="true"
      >
        {Data[lang].partners.map((item, key) => {
          return (
            <SwiperSlide key={key} className="pt-3 mt-3 mb-5">
              <div className="row m-0  justify-content-center align-items-center ">
                <div className="col-12">
                  <img src={icons[item.icon]} alt={item.title} width={"50%"} />
                </div>
                <div className="col-12 mt-5">
                  <h6 style={{ fontWeight: 600 }}>{item.title}</h6>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };

  return (
    <div className="row m-0 justify-content-center align-items-center text-center mb-5">
      <div className="col-12 p-0 mt-5">
        <h1>{Data[lang].title}</h1>
      </div>
      <div className="col-12 p-0">
        <PartnerSlide />
      </div>
    </div>
  );
};

export default Partner;
