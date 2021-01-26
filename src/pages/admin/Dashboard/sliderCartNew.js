import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import Axios from "axios";
import Utils from "../../../utils/device";
import UserState from "../../../utils/state";
import Select from "react-select";
import { Button } from "@material-ui/core";

import MyNumeral from "numeral";

import { Add, Remove, Delete } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { FileCopy } from "@material-ui/icons";

import dateFormat from "dateformat";

const SliderCartNew = ({ order }) => {
  const { screenWidth } = Utils();

  const updateOrder = () => {
    Axios.post("https://bepahkupi.com/user/order/updateOrder", {
      orderId: order._id,
      status: "sent",
    })
      .then((r) => {
        alert(r.data.message);
      })
      .catch((e) => console.log(e));
  };

  const SwiperCart = () => (
    <Swiper
      slidesPerView={
        screenWidth > 960 ? "2.5" : screenWidth > 600 ? "2.5" : "1.5"
      }
      spaceBetween={30}
      pagination={{ clickable: true, dynamicBullets: true }}
      className="mb-5"
    >
      {order.cart.cart.cart.map((item, key) => {
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
            >
              <img
                src={item.product.image}
                alt="Banner"
                width={"100%"}
                style={{ borderRadius: 10 }}
                onClick={() =>
                  (window.location.href = `/product/${item.product.slug}`)
                }
              />
              <span
                className="text-center"
                onClick={() =>
                  (window.location.href = `/product/${item.product.slug}`)
                }
              >
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: 20,
                    textTransform: "capitalize",
                  }}
                >
                  {item.product.name}
                </p>
                <p style={{ fontWeight: 300, fontSize: 20, margin: 0 }}>
                  {MyNumeral(item.weight).format("Oa")}g
                </p>
                <p
                  style={{
                    fontWeight: 300,
                    fontSize: 20,
                    margin: 0,
                    textTransform: "capitalize",
                  }}
                >
                  {item.type}
                </p>
                {item.groundLevel && (
                  <p
                    style={{
                      fontWeight: 300,
                      fontSize: 20,
                      margin: 0,
                      textTransform: "capitalize",
                    }}
                  >
                    {item.groundLevel}
                  </p>
                )}
                <p style={{ fontWeight: 300, fontSize: 30, margin: 0 }}>
                  Rp {MyNumeral(item.price).format("0,0.00")}
                </p>
                <p style={{ fontWeight: 300, fontSize: 20 }}>
                  QTY: {item.quantity}
                </p>
              </span>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );

  const DetailUser = () => (
    <div style={{ display: "flex", gap: 20, flexDirection: "column" }}>
      <span>
        <h4>Name</h4>
        <small>{order.shipping.name}</small>
      </span>

      <span>
        <h4>Email</h4>
        <small>{order.shipping.email}</small>
      </span>

      <span>
        <h4>Phone Number</h4>
        <small>{order.shipping.phoneNumber}</small>
      </span>

      <span>
        <h4>Address</h4>
        <small>{order.shipping.address}</small>
      </span>

      <span>
        <h4>Courier</h4>
        <small>
          {order.shipping.courier.courier.toUpperCase()}{" "}
          {order.shipping.courier.service}- Rp{" "}
          {MyNumeral(order.shipping.courier.cost).format("0,0.00")}
        </small>
      </span>

      <span>
        <h4>Products Price</h4>
        <small>
          Rp {MyNumeral(order.cart.cart.totalPrice).format("0,0.00")}
        </small>
      </span>

      <span>
        <h4>Status</h4>
        <small>{order.status}</small>
      </span>

      {order.status == "packaging" && (
        <span>
          <Button variant="contained" color="primary" onClick={updateOrder}>
            Update bahwa pesanan telah dikirim
          </Button>
        </span>
      )}
    </div>
  );

  return (
    <div className="row justify-content-center align-items-center">
      <div className="col-lg-6">
        <SwiperCart />
      </div>
      <div className="col-lg-6">
        <DetailUser />
      </div>
    </div>
  );
};

export default SliderCartNew;
