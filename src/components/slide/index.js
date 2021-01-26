import React from "react";
import { Grid, Button } from "@material-ui/core";

import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import ImageSlide from "../../assets/backgroundSlide.png";
import Products from "../../assets/products.png";

const Slide = (props) => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{
        backgroundImage: `url(${ImageSlide})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Grid item xs={11} md={5}>
        <Grid
          container
          direction="column"
          style={{
            textAlign:
              props.width == "sm" || props.width == "xs" ? "center" : "left",
            marginTop: props.width == "sm" || props.width == "xs" ? 20 : 0,
          }}
        >
          <Grid item>
            <h3
              style={{
                fontWeight: "700",
                marginBottom: 30,
              }}
            >
              KOPI YANG KAMU CARI <br />
              ADA DISINI !
            </h3>
          </Grid>
          <Grid item>
            <Button
              style={{
                backgroundColor: "#6F4E37",
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 5,
                color: "white",
                textTransform: "capitalize",
              }}
              onClick={() =>
                window.scrollBy({
                  top: props.width == "sm" || props.width == "xs" ? 800 : 500,
                })
              }
            >
              Temukan Kopimu
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={11}
        md={5}
        style={{
          textAlign:
            props.width == "sm" || props.width == "xs" ? "center" : "left",
          marginTop: props.width == "sm" || props.width == "xs" ? 20 : 0,
        }}
      >
        <img src={Products} width={"80%"} />
      </Grid>
    </Grid>
  );
};

export default withWidth()(Slide);
