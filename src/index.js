import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// scss
import "react-id-swiper/lib/styles/scss/swiper.scss";
// css
import "react-id-swiper/lib/styles/css/swiper.css";
import "swiper/swiper-bundle.css";
import "react-phone-number-input/style.css";

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
