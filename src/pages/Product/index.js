import React, { Suspense, useEffect, useState } from "react";

import Nav from "../../components/NavShop";
import Footer from "../../components/FooterShop";

import Axios from "axios";
import ProductSlider from "../../components/ProductStore";

import heartEmpty from "../../assets/icons/heartEmpty.png";
import userIcon from "../../assets/icons/user.png";

import pos from "../../assets/icons/pos.png";
import jne from "../../assets/icons/jne.png";
import tiki from "../../assets/icons/tiki.png";

import bni from "../../assets/icons/bni.png";
import mandiri from "../../assets/icons/mandiri.png";
import permata from "../../assets/icons/permata.png";
import gopay from "../../assets/icons/gopay.png";

import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarHalf from "@material-ui/icons/StarHalf";
import CartIcon from "@material-ui/icons/ShoppingCart";

import { Button } from "@material-ui/core";

import ReactRenderHTML from "react-render-html";

import StateUtil from "../../utils/state";

import Auth from "../../components/Auth";

const Product = (props) => {
  const { userSession } = StateUtil();
  const availablePayments = [bni, permata, gopay];
  const availableShippings = [jne, tiki, pos];
  const [product, setProduct] = useState();
  const [reviews, setReviews] = useState([]);
  const [maxShow, setMaxShow] = useState(5);
  const [rating, setRating] = useState({
    decimal: true,
    value: 0,
    nonValue: 5,
  });

  const [values, setValues] = useState({
    type: 0,
    groundLevel: 0,
    weight: 0,
    priceIndex: 0,
  });

  const [showReview, setShowReview] = useState(false);

  const formatPrice = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "idr",
    });
  };

  const fetchProduct = () => {
    Axios.get(
      `${process.env.REACT_APP_API}/user/product/readOne?slug=${props.match.params.productSlug}`
    )
      .then((response) => {
        setProduct(response.data.product);
        fetchReviews(response.data.product._id);
      })
      .catch((error) =>
        console.log("Error while fetching product data from server")
      );
  };

  const fetchReviews = (productId) => {
    Axios.get(
      `${process.env.REACT_APP_API}/user/review/read-by-product?productId=${productId}`
    )
      .then((response) => {
        setReviews(response.data.reviews);
        valueRating(response.data.reviews);
      })
      .catch((error) =>
        console.log("Error while fetching product data from server")
      );
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const submitToCart = () => {
    Axios.post(`${process.env.REACT_APP_API}/user/cart/inc-by-qty`, {
      userId: userSession._id,
      productId: product._id,
      weight: product.price[values.priceIndex].weight,
      groundLevel: product.groundLevel[values.groundLevel],
      type: product.type[values.type],
      quantity: 1,
      price: product.price[values.priceIndex].price,
    })
      .then((response) => {
        window.location.href = "/cart";
      })
      .catch((error) => console.log("Error while add to cart"));
  };

  const addToCart = () => {
    if (!userSession) {
      toggleModal("login");
    } else {
      submitToCart();
    }
  };

  const buyNow = () => {
    if (!userSession) {
      toggleModal("login");
    } else {
      submitToCart();
    }
  };

  const [modalState, setModalState] = useState({
    show: false,
    typeModal: "",
  });

  const { show } = modalState;

  const toggleModal = (type) => {
    setModalState({
      typeModal: type,
      show: !show,
    });
  };

  const ContentAuth = () => {
    return (
      <Auth
        typeModal={modalState.typeModal}
        show={show}
        toggleModal={toggleModal}
      />
    );
  };

  const valueRating = (data) => {
    let total = 0;
    let value = 0;

    if (data.length > 0) {
      for (let i in data) {
        total += data[i].rating;
      }
      value = total / data.length;
    }

    setRating({
      decimal: value.isInteger ? true : false,
      value: Math.floor(total / data.length),
      nonValue: data.length > 0 ? 5 - Math.floor(total / data.length) : 5,
    });
  };

  const Rating = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {rating.value > 0 &&
          Array.from(Array(rating.value), (e, i) => {
            if (i == rating.value - 1) {
              return (
                <StarHalf
                  key={i}
                  fontSize="large"
                  style={{ color: "#FAD204" }}
                />
              );
            } else {
              return (
                <StarIcon
                  key={i}
                  fontSize="large"
                  style={{ color: "#FAD204" }}
                />
              );
            }
          })}
        {rating.value - 5 !== 0 &&
          Array.from(Array(rating.nonValue), (e, i) => {
            return (
              <StarOutlineIcon
                key={i}
                fontSize="large"
                style={{ color: "#FAD204" }}
              />
            );
          })}

        {/* <p
          style={{
            margin: 0,
            marginLeft: 20,
            color: "#797979",
            // cursor: "pointer",
          }}
          // onClick={() => {
          //   window.location.href = `#reviews`;
          // }}
        >
          ({reviews.length} Reviews)
        </p> */}
      </div>
    );
  };

  const AvailablePayments = () => {
    return (
      <div className="col-12">
        <dv className="row m-0 align-items-center">
          <div className="col-12">
            <h3>Available Payment Methods</h3>
          </div>
          <div className="col-12">
            <div className="row m-0 align-items-center">
              {availablePayments.map((item, key) => {
                return (
                  <div
                    key={key}
                    className="col-lg-1 col-md-3 col-4 "
                    style={{ marginLeft: 20, marginTop: 10 }}
                  >
                    <img src={item} width={"100%"} alt="payment" />
                  </div>
                );
              })}
            </div>
          </div>
        </dv>
      </div>
    );
  };

  const AvailableShipppings = () => {
    return (
      <div className="col-12">
        <dv className="row m-0 align-items-center">
          <div className="col-12">
            <h3>Available Shipping Methods</h3>
          </div>
          <div className="col-12">
            <div className="row m-0 align-items-center">
              {availableShippings.map((item, key) => {
                return (
                  <div
                    key={key}
                    className="col-lg-1 col-md-3 col-4 "
                    style={{ marginLeft: 20, marginTop: 10 }}
                  >
                    <img src={item} width={"100%"} alt="payment" />
                  </div>
                );
              })}
            </div>
          </div>
        </dv>
      </div>
    );
  };

  const DetailProduct = () => {
    return (
      <div className="row m-0 justify-content-center align-items-center">
        <div className="col-lg-4 col-11 p-0 text-center">
          <img src={product.image} width={"90%"} alt={product.name} />
        </div>

        <div className="col-lg-6 col-11 p-0 text-left">
          <div className="row m-0">
            <div className="col-12">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1 className="text-center text-capitalize">{product.name}</h1>
                {/* <img src={heartEmpty} width={30} height={30} alt="cart" /> */}
              </div>
            </div>

            {/* <div className="col-12 mt-3 mb-3">
              <div style={{ display: "flex", justifyContent: "center" }}>
                {reviews && <Rating />}
              </div>
            </div> */}

            {product.type.length > 0 && (
              <div className="col-12 mt-3 mb-3 text-center">
                <p>Available Options:</p>
                <div
                  style={{ display: "flex", justifyContent: "center", gap: 20 }}
                >
                  {product.type.map((item, key) => {
                    return (
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          backgroundColor:
                            values.type == key ? "#DC5708" : "white",
                          color: values.type == key ? "white" : "black",
                          paddingLeft: 30,
                          paddingRight: 30,
                          height: "100%",
                          borderRadius: 0,
                          boxShadow:
                            "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                        }}
                        onClick={() => {
                          setValues({ ...values, type: key });
                        }}
                      >
                        {item}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {product.groundLevel.length > 0 && (
              <div className="col-12 mt-3 mb-3 ">
                <h4>Ground Level:</h4>
                <div
                  style={{
                    display: "flex",
                    gap: 20,
                    flexWrap: "wrap",
                  }}
                >
                  {product.groundLevel.map((item, key) => {
                    return (
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          backgroundColor:
                            values.groundLevel == key ? "#DC5708" : "white",
                          color: values.groundLevel == key ? "white" : "black",
                          paddingLeft: 30,
                          paddingRight: 30,
                          height: "100%",
                          borderRadius: 0,
                          boxShadow:
                            "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                        }}
                        onClick={() => {
                          setValues({ ...values, groundLevel: key });
                        }}
                      >
                        {item}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="col-12 mt-3 mb-3 ">
              <h4>Weight:</h4>
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  flexWrap: "wrap",
                }}
              >
                {product.price.map((item, key) => {
                  return (
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor:
                          values.weight == key ? "#DC5708" : "white",
                        color: values.weight == key ? "white" : "black",
                        paddingLeft: 30,
                        paddingRight: 30,
                        height: "100%",
                        borderRadius: 0,
                        textTransform: "capitalize",
                        boxShadow:
                          "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                      }}
                      onClick={() => {
                        setValues({ ...values, weight: key, priceIndex: key });
                      }}
                    >
                      {item.weight >= 1000
                        ? item.weight / 1000 + " kg"
                        : item.weight + " gr"}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="col-12  ">
              <p style={{ fontWeight: 300, fontSize: 30 }}>
                {formatPrice(product.price[values.weight].price)}
              </p>
            </div>

            <div className="col-12 mb-5 ">
              <span
                style={{
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                  gap: 30,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "white",
                    color: "white",
                    paddingLeft: 30,
                    paddingRight: 30,
                    width: "20%",
                    height: "100%",
                    borderRadius: 0,
                  }}
                  onClick={() => {
                    addToCart();
                  }}
                >
                  <CartIcon fontSize="large" style={{ color: "black" }} />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "#DC5708",
                    color: "white",
                    paddingLeft: 30,
                    paddingRight: 30,
                    width: "80%",
                    height: "100%",
                    borderRadius: 0,
                  }}
                  onClick={() => {
                    buyNow();
                  }}
                >
                  Buy Now
                </Button>
              </span>
            </div>
          </div>
        </div>

        <div className="col-lg-11 p-0 ">
          <div className="row m-0 align-items-center ">
            <div className="col-12">
              <span
                style={{
                  height: 50,
                  display: "flex",
                  gap: 30,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: !showReview ? "#DC5708" : "white",
                    color: !showReview ? "white" : "black",
                    paddingLeft: 30,
                    paddingRight: 30,
                    height: "100%",
                    borderRadius: 0,
                  }}
                  onClick={() => {
                    setShowReview(false);
                  }}
                >
                  Description
                </Button>
                {/* <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: showReview ? "#DC5708" : "white",
                    color: showReview ? "white" : "black",
                    paddingLeft: 30,
                    paddingRight: 30,
                    height: "100%",
                    borderRadius: 0,
                  }}
                  onClick={() => {
                    setShowReview(true);
                  }}
                >
                  Reviews
                </Button> */}
              </span>
            </div>
          </div>
        </div>

        {!showReview && (
          <div className="col-lg-11 mt-3 mb-3">
            {ReactRenderHTML(product.description)}
          </div>
        )}

        {showReview && (
          <div className="col-lg-11  mt-5 mb-3">
            <div className="row m-0 ">
              {reviews.length > 1
                ? reviews.slice(0, maxShow).map((item, key) => {
                    return (
                      <div className="row mb-5">
                        <div
                          className="col-4 text-center"
                          style={{
                            backgroundColor: item.image ? "" : "gray",
                            height: 75,
                            width: 75,
                            borderRadius: 100,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={item.image ? item.image : userIcon}
                            width={"100%"}
                            alt={item.name}
                          />
                        </div>

                        <div className="col-8">
                          <div
                            style={{
                              padding: 10,
                              marginLeft: 20,
                              boxShadow:
                                "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                              borderRadius: 10,
                              width: "100%",
                            }}
                          >
                            <h5>{item.author.name}</h5>
                            <p>{item.comment}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : "No Reviews"}
            </div>
            {reviews.length > maxShow && (
              <Button
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: showReview ? "#DC5708" : "white",
                  color: showReview ? "white" : "black",
                  paddingLeft: 30,
                  paddingRight: 30,
                  height: "100%",
                  borderRadius: 0,
                }}
                onClick={() => {
                  setMaxShow(maxShow + 5);
                }}
              >
                Show More
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  const Content = () => {
    return (
      <div className="row m-0">
        <ContentAuth />
        <Nav />
        <div className="col-12 p-0" style={{ marginTop: 100 }}>
          {product && <DetailProduct />}
        </div>
        <div className="col-12 m-4">
          <AvailablePayments />
        </div>

        <div className="col-12 m-4">
          <AvailableShipppings />
        </div>
        <div className="col-12 p-0 mt-5">
          <ProductSlider />
        </div>
        <div className="col-12 p-0">
          <Footer />
        </div>
      </div>
    );
  };

  const Loading = () => {
    return <div>Loading...</div>;
  };
  return <Content />;
};

export default Product;
