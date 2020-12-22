import React from "react";

import Jumbotron from "../../components/Jumbotron";
import Value from "../../components/Value";
import Product from "../../components/Product";
import Provide from "../../components/Provide";
import Award from "../../components/Award";
import Partner from "../../components/Partner";
import Process from "../../components/Process";
import Subscribe from "../../components/Subscribe";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

const Home = () => {
  return (
    <div className="row m-0">
      <Nav />
      <div className="col-12 p-0">
        <Jumbotron
          menuDown={{ status: true, link: "/#product" }}
          button={{ status: true, link: "https://www.bepahkupi.com/shop" }}
        />
      </div>
      <div className="col-12 p-0" id="product">
        <Product />
      </div>
      <div className="col-12 p-0">
        <Value />
      </div>
      <div className="col-12 p-0">
        <Provide />
      </div>
      <div className="col-12 p-0">
        <Award />
      </div>
      <div className="col-12 p-0">
        <Process />
      </div>
      <div className="col-12 p-0">
        <Partner />
      </div>
      <div className="col-12 p-0">
        <Subscribe />
      </div>
      <div className="col-12 p-0">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
