import React from "react";

import Nav from "../../components/NavShop";
import Footer from "../../components/FooterShop";
// import Banner from "../../components/Banner";
import Product from "../../components/ProductStore";
import Slide from "../../components/slide";
import ProcessDelivery from "../../components/processDelivery";

const Home = () => {
  const Content = () => {
    return (
      <div className="row m-0">
        <Nav />
        {/* <div className="col-12 p-0">
          <Banner />
        </div> */}
        <div className="col-12 p-0" style={{ marginTop: 100 }}>
          <Slide />
        </div>
        <div className="col-12 p-0">
          <ProcessDelivery />
        </div>
        <div className="col-12 p-0">
          <Product />
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

export default Home;
