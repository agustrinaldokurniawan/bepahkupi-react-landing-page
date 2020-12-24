import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import Axios from "axios";
import Utils from "../../utils/device";
import UserState from "../../utils/state";
import Select from "react-select";
import { Button } from "@material-ui/core";

import MyNumeral from "numeral";

import { Add, Remove, Delete } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { FileCopy } from "@material-ui/icons";

import dateFormat from "dateformat";

const SliderCart = (props) => {
  const { userSession } = UserState();
  const [orders, setOrders] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = () => {
    Axios.get(
      `${process.env.REACT_APP_API}/user/order/readAllByUser?userId=${userSession._id}`
    )
      .then((response) => {
        if (response.data.orders) {
          let arr = [];
          for (let i in response.data.orders) {
            arr.push({
              index: i,
              label: dateFormat(
                response.data.orders[i].createdAt,
                "dddd, mmmm dS, yyyy, h:MM:ss TT"
              ),
              value: response.data.orders[i],
            });
          }

          setOrders(arr);
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => console.log("Error while fetching data from server"));
  };

  const { screenWidth } = Utils();

  const SwiperCart = () => {
    return (
      <Swiper
        slidesPerView={
          screenWidth > 960 ? "2.5" : screenWidth > 600 ? "2.5" : "1.5"
        }
        spaceBetween={30}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="mb-5"
      >
        {orders[currentIndex] &&
          orders[currentIndex].value.cart.cart.cart.map((item, key) => {
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
                      {item.name}
                    </p>
                    <p
                      style={{
                        fontWeight: 300,
                        fontSize: 30,
                        margin: 0,
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
  };

  function humanize(str) {
    var i,
      frags = str.split("_");
    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(" ");
  }

  const DetailOrder = () => {
    return (
      <div className="col-lg-6 col-12">
        <h1>Informations</h1>

        {orders[currentIndex].value.payment.response.transaction_status ==
          "PENDING" &&
          orders[currentIndex].value.payment.type == "gopay" && (
            <div
              className="col-12 text-center mt-5 mb-5 "
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h4>Payment Pending</h4>
              <small style={{ textTransform: "uppercase" }}>
                Gopay QR Code
              </small>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    orders[currentIndex].value.payment.response.actions[0].url
                  }
                  width={"50%"}
                  alt="qr-code"
                />
                <span
                  style={{
                    fontSize: 40,
                    margin: 0,
                    textTransform: "capitalize",
                  }}
                >
                  Rp{" "}
                  {MyNumeral(
                    orders[currentIndex].value.payment.response.gross_amount
                  ).format("0,0.00")}
                </span>

                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "#DC5708",
                    color: "white",
                    paddingLeft: 30,
                    paddingRight: 30,
                    height: "100%",
                    borderRadius: 0,
                  }}
                  onClick={() =>
                    window.open(
                      orders[currentIndex].value.payment.response.actions[1].url
                    )
                  }
                >
                  Pay Now
                </Button>
              </span>
              <small style={{ textTransform: "uppercase" }}>
                <i>*Refresh page to get new payment status</i>
              </small>
            </div>
          )}

        {orders[currentIndex].value.payment.response.status &&
          orders[currentIndex].value.payment.response.status == "PENDING" &&
          orders[currentIndex].value.payment.type == "fva" && (
            <div
              className="col-12 text-center mt-5 mb-5"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h4>Payment Pending</h4>
              <small style={{ textTransform: "uppercase" }}>
                Virtual Account Number{" "}
                {humanize(
                  orders[currentIndex].value.payment.response.bank_code
                )}
                {" : "}
              </small>
              <span
                style={{
                  fontSize: 20,
                  margin: 0,
                  textTransform: "capitalize",
                  backgroundColor: "white",
                  width: 400,
                  display: "flex",
                  justifyContent: "space-between",
                  alignSelf: "center",
                  marginTop: 20,
                  marginBottom: 20,
                  height: 80,
                  borderRadius: 10,
                  border: "2px solid gray",
                  alignItems: "center",
                  paddingLeft: 10,
                  paddingRight: 10,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    orders[currentIndex].value.payment.response.account_number
                  );
                  alert("copied");
                }}
              >
                {orders[currentIndex].value.payment.response.account_number}
                <FileCopy fontSize="small" />
              </span>

              <span
                style={{
                  fontSize: 40,
                  margin: 0,
                  textTransform: "capitalize",
                }}
              >
                Rp{" "}
                {MyNumeral(
                  orders[currentIndex].value.payment.response.expected_amount
                ).format("0,0.00")}
              </span>
              <small style={{ textTransform: "uppercase" }}>
                <i>*Refresh page to get new payment status</i>
              </small>
            </div>
          )}
        <div
          className="col-12 mt-5"
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <span>
            <small>Recipient</small>
            <p
              style={{
                fontWeight: 600,
                fontSize: 20,
                margin: 0,
              }}
            >
              {orders[currentIndex].value.shipping.name}
            </p>
          </span>

          <span>
            <small>Email</small>
            <p
              style={{
                fontSize: 20,
                margin: 0,
              }}
            >
              {orders[currentIndex].value.shipping.email}
            </p>
          </span>

          <span>
            <small>Phone Number</small>
            <p
              style={{
                fontSize: 20,
                margin: 0,
              }}
            >
              {orders[currentIndex].value.shipping.phoneNumber}
            </p>
          </span>

          <span>
            <small>Address</small>
            <p
              style={{
                fontSize: 20,
                margin: 0,
              }}
            >
              {orders[currentIndex].value.shipping.address}
              {", "}
              {
                orders[currentIndex].value.shipping.courier.destination_details
                  .subdistrict.subdistrict_name
              }
              {", "}
              {
                orders[currentIndex].value.shipping.courier.destination_details
                  .subdistrict.type
              }{" "}
              {
                orders[currentIndex].value.shipping.courier.destination_details
                  .subdistrict.city
              }
            </p>
          </span>

          {!orders[currentIndex].value.payment.response.status && (
            <span>
              <small>Delivery estimation</small>
              <p
                style={{
                  fontSize: 20,
                  margin: 0,
                }}
              >
                {orders[currentIndex].value.shipping.courier.estimation} days
              </p>
            </span>
          )}

          <span>
            <small>Status</small>
            <p
              style={{
                fontSize: 20,
                margin: 0,
                textTransform: "capitalize",
              }}
            >
              {orders[currentIndex].value.status}
            </p>
          </span>

          {orders[currentIndex].value.shipping.resi && (
            <span>
              <small>Resi</small>
              <p
                style={{
                  fontSize: 20,
                  margin: 0,
                  textTransform: "capitalize",
                }}
              >
                {orders[currentIndex].value.shipping.resi}
              </p>
            </span>
          )}

          <span>
            <small>Total Price</small>
            <p
              style={{
                fontSize: 40,
                margin: 0,
                textTransform: "capitalize",
              }}
            >
              Rp {MyNumeral(orders[currentIndex].value.amount).format("0,0.00")}
            </p>
          </span>
        </div>
      </div>
    );
  };

  return orders && orders.length > 0 ? (
    <div className="row m-0 ">
      <div className="col-12 mb-5" style={{ zIndex: 2 }}>
        <h1>Order History</h1>
        <Select
          onChange={(selectedOption) => setCurrentIndex(selectedOption.index)}
          // value={orders}
          options={orders}
          placeholder="Find by order date"
        />
      </div>
      {orders && (
        <div className="col-lg-6 col-12 ">
          <div className="col-12 text-center">
            <h3>Cart Detail</h3>
          </div>
          <SwiperCart />
        </div>
      )}
      {orders && <DetailOrder />}
    </div>
  ) : (
    <EmptyCart />
  );
};

const EmptyCart = () => {
  return (
    <div className="row m-0 justify-content-center align-items-center mt-5">
      <div className="col-12">
        <div className="col-12 text-center">
          <h3>You Don't Have Order History Yet</h3>
        </div>
        <div className="col-12 text-center">
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#DC5708",
              color: "white",
              paddingLeft: 30,
              paddingRight: 30,
              height: "100%",
              borderRadius: 0,
              marginTop: 20,
            }}
            onClick={() => {
              window.location.href = `/`;
            }}
          >
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SliderCart;
