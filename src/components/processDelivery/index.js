import React from "react";
import { Grid, Button } from "@material-ui/core";

import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import Bag from "../../assets/icons/bag.png";
import ArrowRight from "../../assets/icons/arrow_right.png";
import Payment from "../../assets/icons/payment.png";
import Delivery from "../../assets/icons/delivery.png";
import Package from "../../assets/icons/package.png";
import Drink from "../../assets/icons/drink.png";

import BGSlide from "../../assets/bg-coffee.png";

const ProcessDelivery = (props) => {
  return (
    <Grid
      container
      justify="center"
      style={{
        backgroundImage: `url(${BGSlide})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        textAlign: "center",
        padding: "5%",
      }}
    >
      <Grid item md={1} xs={2}>
        <span>
          <img src={Bag} alt="me" width="48" height="48" />
        </span>
        <p>Pilih produk yang anda inginkan</p>
      </Grid>
      <Grid item md={1} xs={2}>
        <img src={ArrowRight} alt="me" width="32" height="32" />
      </Grid>
      <Grid item md={1} xs={2}>
        <span>
          <img src={Payment} alt="me" width="48" height="48" />
        </span>
        <p>Selesaikan pembayaran</p>
      </Grid>
      <Grid item md={1} xs={2}>
        <img src={ArrowRight} alt="me" width="32" height="32" />
      </Grid>
      <Grid item md={1} xs={2}>
        <span>
          <img src={Delivery} alt="me" width="48" height="48" />
        </span>
        <p>Kopi mu diantar</p>
      </Grid>
      <Grid item md={1} xs={2}>
        <img src={ArrowRight} alt="me" width="32" height="32" />
      </Grid>

      <Grid item md={1} xs={2}>
        <span>
          <img src={Package} alt="me" width="48" height="48" />
        </span>
        <p>Terima produk</p>
      </Grid>
      <Grid item md={1} xs={2}>
        <img src={ArrowRight} alt="me" width="32" height="32" />
      </Grid>
      <Grid item md={1} xs={2}>
        <span>
          <img src={Drink} alt="me" width="48" height="48" />
        </span>
        <p>Kopi siap dinikmati</p>
      </Grid>
    </Grid>
  );
};

export default withWidth()(ProcessDelivery);
