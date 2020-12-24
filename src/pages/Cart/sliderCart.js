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

const SliderCart = (props) => {
  const { userSession } = UserState();
  const [cart, setCart] = useState();
  const [quantity, setQuantity] = useState();
  const [options, setOptions] = useState({
    city: [],
    shipping: [],
    subdistrict: [],
    payment: [],
  });
  const [values, setValues] = useState({
    destination: "",
    weight: "",
    shipping: "",
    payment: "",
    name: userSession.name,
    email: userSession.email,
    phoneNumber: "",
    address: "",
    promoCode: "",
    subdistrict: "",
  });

  const ListCity = () => {
    Axios.get(`${process.env.REACT_APP_API}/user/order/destination`)
      .then((response) => {
        // console.log(response.data.destinations);
        setOptions({ ...options, city: response.data.destinations });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ListSubdistrict = (cityId) => {
    Axios.get(
      `${process.env.REACT_APP_API}/user/order/address?cityId=${cityId}`
    )
      .then((response) => {
        // console.log(response.data.subdistricts);
        setOptions({ ...options, subdistrict: response.data.subdistricts });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ListShipping = (destination) => {
    Axios.get(
      `${process.env.REACT_APP_API}/user/order/shipping?destination=${destination}&weight=${values.weight}`
    )
      .then((response) => {
        setOptions({ ...options, shipping: response.data.shipping });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDestination = (selectedOption) => {
    setValues({ ...values, destination: selectedOption });
    ListSubdistrict(selectedOption.value.city_id);
  };
  const handleSubdistrict = (selectedOption) => {
    setValues({ ...values, subdistrict: selectedOption });
    ListShipping(selectedOption.value.subdistrict_id);
  };
  const handleShipping = (selectedOption) => {
    setValues({ ...values, shipping: selectedOption });
    fetchPaymentChannels();
  };
  const handlPayment = (selectedOption) => {
    setValues({ ...values, payment: selectedOption });
  };

  const formatGroupLabel = (data) => {
    return (
      <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
      </div>
    );
  };

  const decreaseProduct = ({ productId, weight, groundLevel, type, price }) => {
    Axios.post(`${process.env.REACT_APP_API}/user/cart/dec-by-qty`, {
      userId: userSession._id,
      productId,
      weight,
      groundLevel,
      type,
      quantity: 1,
      price,
    })
      .then((response) => {
        window.location.reload();
        alert("decrease from cart");
      })
      .catch((error) => console.log("Error while post data from server"));
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [message, setMessage] = useState();
  const validateData = () => {
    if (
      values.name &&
      values.email &&
      values.phoneNumber &&
      values.address &&
      values.shipping &&
      values.payment
    ) {
      const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
      if (emailRegex.test(values.email)) {
        const phoneNumberRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
        if (phoneNumberRegex.test(values.phoneNumber)) {
          const addressRegex = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\)\(+\=\._-]+$/g;
          if (addressRegex.test(values.address)) {
            if (values.promoCode) {
              const promoRegex = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\)\(+\=\._-]+$/g;
              if (promoRegex.test(values.promoCode)) {
                return true;
              } else {
                return "Promo code invalid";
              }
            } else {
              return true;
            }
          } else {
            return "Address invalid";
          }
        } else {
          return "Phone Number invalid";
        }
      } else {
        return "Email invalid";
      }
    } else {
      return "Please fill the form correctly";
    }
  };
  const onSubmit = () => {
    if (validateData() == true) {
      Axios.post(`${process.env.REACT_APP_API}/user/order/payment`, {
        userId: userSession._id,
        cartId: cart._id,
        shipping: {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          address: values.address,
          promoCode: values.promoCode,
          courier: {
            weight: values.weight,
            cost: values.shipping.value.cost[0].value,
            estimation: values.shipping.value.cost[0].etd,
            courier: values.shipping.courier,
            service: values.shipping.value.service,
          },
          destination_details: {
            city: values.destination.value,
            subdistrict: values.subdistrict.value,
          },
        },
        payment: values.payment,
      })
        .then((response) => {
          // console.log(response.data);
          window.location.href = "/order";
        })
        .catch((error) => console.log("Error while create order"));
    } else {
      setMessage(validateData());
    }
  };

  const addTocart = ({ productId, weight, groundLevel, type, price }) => {
    Axios.post(`${process.env.REACT_APP_API}/user/cart/inc-by-qty`, {
      userId: userSession._id,
      productId,
      weight,
      groundLevel,
      type,
      quantity: 1,
      price,
    })
      .then((response) => {
        window.location.reload();
        alert("increase from cart");
      })
      .catch((error) => console.log("Error while post data from server"));
  };

  const removeFromCart = ({
    productId,
    weight,
    groundLevel,
    type,
    price,
    quantity,
  }) => {
    Axios.post(`${process.env.REACT_APP_API}/user/cart/dec-by-qty`, {
      userId: userSession._id,
      productId,
      weight,
      groundLevel,
      type,
      quantity,
      price,
    })
      .then((response) => {
        window.location.reload();
        alert("remove from cart");
      })
      .catch((error) => console.log("Error while post data from server"));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    Axios.get(
      `${process.env.REACT_APP_API}/user/cart/readOne?userId=${userSession._id}`
    )
      .then((response) => {
        setCart(response.data.cart);
        let w = 0;
        for (let i in response.data.cart.cart.cart) {
          w +=
            response.data.cart.cart.cart[i].weight *
            response.data.cart.cart.cart[i].quantity;
        }
        setValues({ ...values, weight: w });
        ListCity();
      })
      .catch((error) =>
        console.log("Error while fetching product data from server")
      );
  };

  const fetchPaymentChannels = () => {
    Axios.get(`${process.env.REACT_APP_API}/user/order/payment-channels`)
      .then((response) => {
        setOptions({ ...options, payment: response.data.paymentChannels });
      })
      .catch((error) =>
        console.log("Error while fetching payment channels data from server")
      );
  };

  const { screenWidth } = Utils();

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center",
  };

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
        {cart &&
          cart.cart.cart.map((item, key) => {
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
                    <p style={{ fontWeight: 300, fontSize: 20 }}></p>
                  </span>
                  <span
                    style={{
                      height: 50,
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
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
                      onClick={() => {
                        decreaseProduct({
                          productId: item.product._id,
                          weight: item.weight,
                          groundLevel: item.groundLevel,
                          type: item.type,
                          price: item.price,
                        });
                      }}
                    >
                      <Remove fontSize="small" style={{ color: "white" }} />
                    </Button>

                    <p style={{ fontWeight: 300, fontSize: 30, margin: 0 }}>
                      {item.quantity}
                    </p>

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
                      onClick={() => {
                        addTocart({
                          productId: item.product._id,
                          weight: item.weight,
                          groundLevel: item.groundLevel,
                          type: item.type,
                          price: item.price,
                        });
                      }}
                    >
                      <Add fontSize="small" style={{ color: "white" }} />
                    </Button>
                  </span>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      paddingLeft: 30,
                      paddingRight: 30,
                      height: 50,
                      borderRadius: 0,
                      marginTop: 20,
                    }}
                    onClick={() => {
                      removeFromCart({
                        productId: item.product._id,
                        weight: item.weight,
                        groundLevel: item.groundLevel,
                        type: item.type,
                        price: item.price,
                        quantity: item.quantity,
                      });
                    }}
                  >
                    <Delete fontSize="small" style={{ color: "white" }} />
                  </Button>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    );
  };

  return cart && cart.cart.cart.length > 0 ? (
    <div className="row m-0 ">
      <div className="col-lg-6 col-12 ">
        <div className="col-12 text-center">
          <h3>My Cart</h3>
          <h4>
            Subtotal: Rp{" "}
            {cart && MyNumeral(cart.cart.totalPrice).format("0,0.00")}
          </h4>
        </div>
        {cart && <SwiperCart />}
      </div>
      <div className="col-lg-6 col-12">
        <h1>Checkout Cart</h1>
        <div
          className="col-lg-6 mt-5"
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <TextField
            id="standard-helperText"
            label="Recipient"
            defaultValue={userSession.name || ""}
            helperText=""
            onChange={handleChange("name")}
          />{" "}
          <TextField
            id="standard-helperText"
            label="Email"
            defaultValue={userSession.email || ""}
            helperText=""
            onChange={handleChange("email")}
          />
          <TextField
            id="standard-helperText"
            label="Phone Number"
            defaultValue={userSession.phoneNumber || ""}
            helperText=""
            onChange={handleChange("phoneNumber")}
          />
          <TextField
            id="standard-helperText"
            label="Address"
            defaultValue={""}
            helperText="House number, Street name"
            onChange={handleChange("address")}
          />
          <Select
            onChange={handleDestination}
            value={values.destination}
            options={options.city}
            placeholder="City"
          />
          <Select
            onChange={handleSubdistrict}
            value={values.subdistrict}
            options={options.subdistrict}
            placeholder="District"
          />
          <Select
            value={values.shipping}
            options={options.shipping}
            placeholder="Shipping Method"
            formatGroupLabel={formatGroupLabel}
            onChange={handleShipping}
            noOptionsMessage={() => "City destination needed"}
          />
          <Select
            defaultValue={options.payment[1]}
            value={values.payment}
            options={options.payment}
            placeholder="Payment Method"
            formatGroupLabel={formatGroupLabel}
            onChange={handlPayment}
          />
          <TextField
            id="standard-helperText"
            label="Promo Code"
            helperText=""
            onChange={handleChange("promoCode")}
          />
          {values.shipping && (
            <p style={{ fontWeight: 300, fontSize: 30, margin: 0 }}>
              Total: Rp{" "}
              {MyNumeral(
                values.shipping.value.cost[0].value + cart.cart.totalPrice
              ).format("0,0.00")}
            </p>
          )}{" "}
          {message && (
            <div
              style={{
                backgroundColor: "red",
                marginTop: 10,
                marginBottom: 10,
                padding: 5,
                borderRadius: 5,
                color: "white",
              }}
            >
              <div className="row m-0 justify-content-between">
                <div className="col-10">
                  <small>{message}</small>
                </div>
                <div className="col-2">
                  <small>
                    <CloseIcon
                      fontSize="small"
                      style={{
                        color: "white",
                        float: "right",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setMessage();
                      }}
                    />
                  </small>
                </div>
              </div>
            </div>
          )}
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
            onClick={onSubmit}
          >
            Checkout
          </Button>
        </div>
      </div>
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
          <h3>You Don't Have Cart Yet</h3>
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
