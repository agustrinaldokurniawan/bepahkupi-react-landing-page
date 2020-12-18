import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import RenderHTML from "react-render-html";
import Axios from "axios";
import SliderBlog from "./sliderBlog";

const ReadBlog = (props) => {
  const [blog, setBlog] = useState({});
  const [fetched, setFetched] = useState(false);

  const fetchBlog = () => {
    Axios.get(`https://www.bepahkupi.com/api//blog/${props.match.params.slug}`)
      .then((response) => {
        // console.log(response.data.blog.image);
        setBlog(response.data.blog);
        document.title = `${response.data.blog.title}` + document.title;
      })
      .catch((error) => {
        console.log("Error while fetching detail blog from server");
      });
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="row m-0 justify-content-center">
      <Nav />
      <div className="col-md-8 col-10 p-0 text-center mt-5 mb-5">
        <h1 className="mt-5 pt-5">{blog.title}</h1>
        <img
          src={blog.image}
          width={"80%"}
          alt={blog.title}
          className="mt-5 mb-5"
        />
        <p className="text-justify">
          {blog.content && RenderHTML(blog.content)}
        </p>
      </div>
      <div className="col-12 p-0 mt-5">
        <SliderBlog />
      </div>
      <div className="col-12 p-0 mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default ReadBlog;
