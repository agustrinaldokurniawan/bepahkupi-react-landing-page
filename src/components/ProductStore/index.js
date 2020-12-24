import React, { Suspense } from "react";

import SliderProduct from "./sliderProduct";

const Product = () => {
  const Content = () => {
    return (
      <div className="row m-0 justify-content-center align-items-center">
        <div className="col-11 p-0 mt-5 ">
          <h3>Recommendation Product</h3>
        </div>
        <div className="col-12 p-0 mb-5">
          <SliderProduct />
        </div>
      </div>
    );
  };

  return <Content />;
};

export default Product;
