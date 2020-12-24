import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

const SmallBanner = ({ banners }) => {
  return (
    <div className="row m-0 justify-content-center align-items-center">
      <div className="col-12 p-0" style={{ marginTop: 40 }}>
        <Swiper
          slidesPerView={"1"}
          spaceBetween={30}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop="true"
        >
          {banners.map((item, key) => {
            return (
              <SwiperSlide
                key={key}
                className=" mt-3"
                style={{ cursor: "pointer", width: "70%" }}
                onClick={() => (window.location.href = `/${item.url}`)}
              >
                <div className="col-12">
                  <img src={item.image.small} alt="Banner" width={"100%"} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default SmallBanner;
