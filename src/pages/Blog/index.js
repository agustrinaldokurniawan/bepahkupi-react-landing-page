import React, { useState, useEffect } from "react";

import LangUtils from "../../utils/lang";
import Data from "./data.json";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

import RenderHTML from "react-render-html";
import Jumbotron from "../../components/Jumbotron";
import SliderBlog from "./sliderBlog";
import Rate from "../../components/Rate";

import Axios from "axios";

const Blog = () => {
  const { lang } = LangUtils();
  const [choosenBlog, setChoosenBlog] = useState({
    title: "",
    image: "",
    text: "",
    link: "",
  });

  const fetchBlogs = () => {
    Axios.get("https://www.bepahkupi.com/api/blog")
      .then((response) => {
        chooseBlog(response.data.blogs);
        // console.log(response.data.blogs);
      })
      .catch((error) =>
        console.log("Error while fetching blog data from server")
      );
  };

  const chooseBlog = async (item) => {
    const index = await Math.floor(Math.random() * item.length);
    setChoosenBlog({
      title: item[index].title,
      text: RenderHTML(item[index].content.substring(0, 150) + "..."),
      image: item[index].image,
      link: `/blog/${item[index].slug}`,
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="row m-0">
      <Nav />
      <Rate />
      <div className="col-12 p-0">
        <Jumbotron
          title={choosenBlog.title}
          description={choosenBlog.text}
          button={{
            link: choosenBlog.link,
            text: Data[lang].readMore,
            status: true,
          }}
          image={choosenBlog.image}
        />
      </div>
      <div className="col-12 p-0 mt-5 "></div>
      <div className="col-12 p-0 mb-5">
        <SliderBlog />
      </div>
      <div className="col-12 p-0">
        <Footer />
      </div>
    </div>
  );
};

export default Blog;
