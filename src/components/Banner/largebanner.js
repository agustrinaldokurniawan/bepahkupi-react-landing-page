import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

const LargeBanner = ({ banners }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  return (
    <div className="row m-0 justify-content-center align-items-center">
      <div className="col-12 p-0" style={{ marginTop: 80 }}>
        <Swiper
          slidesPerView={"1.5"}
          spaceBetween={30}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          onActiveIndexChange={(e) => setCurrentBanner(e.activeIndex)}
          className="mb-5"
        >
          {banners.map((item, key) => {
            return (
              <SwiperSlide
                key={key}
                className="pt-3 mt-3 "
                style={{
                  width: "70%",
                  marginLeft: 30,
                  opacity: 1,
                }}
              >
                <div
                  className="col-12"
                  style={{ cursor: "pointer" }}
                  onClick={() => (window.location.href = `/${item.url}`)}
                >
                  <img
                    src={item.image.large}
                    alt="Banner"
                    width={"100%"}
                    style={{ borderRadius: 10 }}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default LargeBanner;
