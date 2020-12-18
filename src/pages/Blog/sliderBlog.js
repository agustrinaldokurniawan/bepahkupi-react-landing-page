import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SearchIcon from "@material-ui/icons/Search";
import { Swiper, SwiperSlide } from "swiper/react";
import Data from "./data.json";
import RenderHTML from "react-render-html";

import DeviceUtils from "../../utils/device";
import LangUtils from "../../utils/lang";
import Axios from "axios";

const SliderBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { lang } = LangUtils();
  const { screenWidth, screenWidthHandleChange } = DeviceUtils();

  const fetchBlogs = () => {
    Axios.get("https://www.bepahkupi.com/api/blog")
      .then((response) => {
        setBlogs(response.data.blogs);
      })
      .catch((error) =>
        console.log("Error while fetching blog data from server")
      );
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const [searchKey, setSearchKey] = useState();

  const Slider = () => {
    return (
      <Swiper
        slidesPerView={screenWidth >= 768 ? "3.5" : "1.5"}
        spaceBetween={30}
        pagination={{ clickable: true }}
      >
        {blogs.map((item, key) => {
          return (
            <SwiperSlide
              key={key}
              className="pt-3 mt-3 mb-5"
              style={{
                display: searchKey
                  ? item.title.includes(searchKey)
                    ? ""
                    : "none"
                  : "",
              }}
            >
              <Card
                onClick={() => (window.location.href = `/blog/${item.slug}`)}
                style={{ cursor: "pointer" }}
              >
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexDirection: "column",
                    alignItems: "center",
                    height: 500,
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <div>
                    <img src={item.image} alt={item.title} width={"90%"} />
                  </div>
                  <div>
                    <h6 style={{ fontWeight: 600 }}>{item.title}</h6>
                    <p>{RenderHTML(item.content.substring(0, 150) + "...")}</p>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };
  return (
    <div className="row m-0 justify-content-center align-items-center">
      <div className="col-10">
        <div className="row m-0 justify-content-center align-items-center">
          <div className="col-lg-6 col-12 mt-3">
            <h1>{Data[lang].discover}</h1>
          </div>
          <div className="col-lg-6 col-12 mt-3">
            <TextField
              id="outlined-basic"
              label={Data[lang].placeholder}
              variant="outlined"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              style={{ width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon fontSize="large" style={{ color: "#979797" }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-10">
        <Slider />
      </div>
    </div>
  );
};
export default SliderBlog;
