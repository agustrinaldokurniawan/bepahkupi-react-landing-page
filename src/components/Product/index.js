import React from "react";

import Lang from "../../utils/lang";
import DeviceUtils from "../../utils/device";
import Data from "./data.json";

import fullWashImage from "../../assets/images/fullWash.png";
import semiWashImage from "../../assets/images/semiWash.png";
import honeyImage from "../../assets/images/honey.png";

import { Swiper, SwiperSlide } from "swiper/react";

const Product = () => {
  const { lang } = Lang();
  const { screenWidth } = DeviceUtils();

  const images = {
    fullWash: fullWashImage,
    semiWash: semiWashImage,
    honey: honeyImage,
  };

  const ProductDesktop = () => {
    return (
      <Swiper
        slidesPerView={screenWidth >= 768 ? "2.5" : "1.5"}
        spaceBetween={30}
        loop={true}
        pagination={{ clickable: true }}
      >
        {Data[lang].products.map((item, key) => {
          return (
            <SwiperSlide key={key}>
              <div className="col-7 p-0">
                <div className="row m-0 justify-content-center">
                  <div className="col-md-12 col-12 p-0">
                    <img
                      src={images[item.image]}
                      width={screenWidth >= 768 ? "50%" : "100%"}
                      alt={item.title}
                    />
                  </div>
                  <div
                    className="col-md-12 col-12 p-0 pt-5 pb-5 p-2 text-white mb-5"
                    style={{ backgroundColor: "#592F16", borderRadius: 10 }}
                  >
                    <h5>{item.title}</h5>
                    <p>{item.profile.title}</p>
                    {item.profile.map((subItem, subKey) => {
                      return (
                        <p key={subKey}>
                          {subItem.title}: {subItem.value}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };

  return (
    <div className="row m-0 justify-content-center align-items-center text-center pt-5 pb-5 mt-5">
      <div className="col-11 p-0">
        <h1>{Data[lang].title}</h1>
      </div>
      <div className="col-11 p-0">
        <div className="row m-0">
          <ProductDesktop />
        </div>
      </div>
    </div>
  );
};

export default Product;
