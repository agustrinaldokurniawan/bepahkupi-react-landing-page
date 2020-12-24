import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import Axios from "axios";
import Utils from "../../utils/device";

import { Button } from "@material-ui/core";

const SliderProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    Axios.get(`${process.env.REACT_APP_API}/user/product/readAll`)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) =>
        console.log("Error while fetching product data from server")
      );
  };

  const { screenWidth } = Utils();

  const findLowestPrice = (arr) => {
    return Math.min(...arr.map((e) => e.price)).toLocaleString("id-ID", {
      style: "currency",
      currency: "idr",
    });
    // return Math.min(...arr.map((e) => e.price));
  };

  const SliderContent = () => (
    <div className="row m-0 justify-content-center align-items-center">
      <div className="col-12 p-0">
        <Swiper
          slidesPerView={
            screenWidth > 960 ? "4.5" : screenWidth > 600 ? "2.5" : "1.5"
          }
          spaceBetween={30}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="mb-5"
        >
          {products.map((item, key) => {
            return (
              <SwiperSlide key={key} className="pt-3 mt-3 mb-5">
                <div
                  style={{
                    cursor: "pointer",
                    backgroundColor: "white",
                    boxShadow:
                      "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginLeft: 30,
                    borderRadius: 10,
                  }}
                  onClick={() =>
                    (window.location.href = `/product/${item.slug}`)
                  }
                >
                  <img
                    src={item.image}
                    alt="Banner"
                    width={"100%"}
                    style={{ borderRadius: 10 }}
                  />
                  <span className="text-center">
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: 20,
                        textTransform: "capitalize",
                      }}
                    >
                      {item.name}
                    </p>
                    <p style={{ fontWeight: 300, fontSize: 12, margin: 0 }}>
                      START FROM
                    </p>
                    <p style={{ fontWeight: 300, fontSize: 30 }}>
                      {findLowestPrice(item.price)}
                    </p>
                  </span>
                  <span style={{ height: 50 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: "#DC5708",
                        color: "white",
                        paddingLeft: 30,
                        paddingRight: 30,
                        width: "100%",
                        height: "100%",
                        borderRadius: 0,
                      }}
                      onClick={() => {
                        window.location.href = `/product/${item.slug}`;
                      }}
                    >
                      Buy Now
                    </Button>
                  </span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );

  return <SliderContent />;
};

export default SliderProduct;
