import React from "react";

import LangUtils from "../../utils/lang";
import Data from "./data.json";

import stock from "../../assets/images/stock.png";
import fairTrade from "../../assets/images/fairTrade.png";
import seed from "../../assets/images/seed.png";

import { Swiper, SwiperSlide } from "swiper/react";

const Provide = () => {
  const { lang } = LangUtils();

  const images = {
    stock: stock,
    fairTrade: fairTrade,
    seed: seed,
  };

  return (
    <div
      className="row m-0 align-items-center justify-content-center text-white"
      style={{ backgroundColor: "#592F16" }}
    >
      <div className="col-11 p-0 mt-5 mb-3 text-center">
        <h1>{Data[lang].title}</h1>
      </div>
      <div className="col-11 p-0">
        <div className="row m-0 justify-content-center mb-5">
          <Swiper
            slidesPerView={"1"}
            spaceBetween={30}
            pagination={{ clickable: true }}
          >
            {Data[lang].content.map((item, key) => {
              return (
                <SwiperSlide className="col-12 pt-3 pb-3 " key={key}>
                  <div className="row m-0 justify-content-center align-items-center">
                    <div
                      className="col-md-6 col-12 mb-md-0 mb-3"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        src={images[item.image]}
                        width={"50%"}
                        alt={item.title}
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

export default Provide;
