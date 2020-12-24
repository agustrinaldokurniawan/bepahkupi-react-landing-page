import React, { Suspense } from "react";

import Nav from "../../components/NavShop";
import Footer from "../../components/FooterShop";
import StateUtils from "../../utils/state";

import SliderCart from "./sliderCart";

const Cart = (props) => {
  const { userSession } = StateUtils();
  const Content = () => {
    return (
      <div className="row m-0">
        <Nav />
        <div
          className="col-12 p-0 "
          style={{ marginTop: 100, marginBottom: 100 }}
        >
          <SliderCart />
        </div>

        <div className="col-12 p-0">
          <Footer />
        </div>
      </div>
    );
  };

  const Loading = <div>Loading...</div>;

  return (
    <Suspense fallback={Loading}>
      <Content />
    </Suspense>
  );
};

export default Cart;
