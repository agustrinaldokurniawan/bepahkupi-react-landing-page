import Axios from "axios";
import React, { useEffect, useState } from "react";

import dateFormat from "dateformat";
import MyNumeral from "numeral";

import { ArrowDropDown } from "@material-ui/icons";

import SliderCart from "./sliderCart";

const DashboardAdmin = () => {
  const [oldOrders, setOldOrders] = useState();
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [income, setIncome] = useState(0);

  const fetchOldOrder = () => {
    Axios.get("https://www.bepahkupi.com/api/all-order")
      .then((r) => {
        setOldOrders(r.data.orders);
        let totalPrice = 0;
        r.data.orders.map((item, key) => {
          if (item.payment.status == "settlement") {
            totalPrice += item.totalPrice;
          }
        });

        setIncome(totalPrice);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchOldOrder();
  }, []);

  const ListOrders = () =>
    oldOrders.map((item, key) => {
      return (
        <div
          className="row mb-3 align-items-center"
          style={{
            fontSize: 20,
            border: "2px solid black",
            borderRadius: 10,
            padding: 20,
          }}
        >
          <div className="col-6">
            {dateFormat(item.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
          </div>
          <div className="col-6">
            <div className="row justify-content-between">
              <div className="col-10">
                Rp {MyNumeral(item.totalPrice).format("0,0.00")}
              </div>
              <div
                className="col-2 text-right"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIndex(key);
                  key == index && setShow(!show);
                }}
              >
                <ArrowDropDown />
              </div>
            </div>
          </div>
          {index == key && show && (
            <div className="col-12 mt-3 mb-3">
              <SliderCart order={item} />
            </div>
          )}
        </div>
      );
    });

  return (
    <div className="row justify-content-center mt-5 mb-5">
      <div className="col-11 mb-5">
        <h1>Orders</h1>
      </div>
      {oldOrders && (
        <div
          className="col-11 text-center mb-5"
          style={{ display: "flex", flexDirection: "row", gap: 10 }}
        >
          <div
            style={{
              padding: 20,
              width: 400,
              backgroundColor: "green",
              color: "white",
              borderRadius: 10,
            }}
          >
            <h1>Total</h1>
            <h3>{oldOrders.length} orders</h3>
          </div>
          <div
            style={{
              padding: 20,
              width: 400,
              backgroundColor: "green",
              color: "white",
              borderRadius: 10,
            }}
          >
            <h1>Income</h1>
            <h3> Rp {MyNumeral(income).format("0,0.00")}</h3>
          </div>
        </div>
      )}
      <div className="col-11">{oldOrders && <ListOrders />}</div>
    </div>
  );
};

export default DashboardAdmin;
