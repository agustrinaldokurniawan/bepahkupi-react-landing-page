import React, { useState, useEffect } from "react";

import LangUtils from "../../utils/lang";
import DeviceUtils from "../../utils/device";
import Data from "./data.json";

import Axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

const Team = () => {
  const { lang } = LangUtils();
  const [team, setTeam] = useState([]);
  const [advisor, setAdvisor] = useState([]);
  const { screenWidth } = DeviceUtils();

  const fetchUser = () => {
    Axios.get(`https://www.bepahkupi.com/api/team`)
      .then((response) => {
        setTeam(response.data.team);
        fetchAdvisor();
      })
      .catch((error) => {
        console.log("Error while fetching team data from server");
      });
  };

  const fetchAdvisor = () => {
    Axios.get(`https://www.bepahkupi.com/api/advisor`)
      .then((response) => {
        setAdvisor(response.data.advisor);
      })
      .catch((error) => {
        console.log("Error while fetching team data from server");
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const TeamSlider = () => {
    return (
      <Swiper
        slidesPerView={screenWidth >= 768 ? "3.5" : "1.5"}
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop="true"
      >
        {team.map((item, key) => {
          return (
            <SwiperSlide key={key} className="pt-3 mt-3 mb-5">
              <div className="row m-0  justify-content-center align-items-center ">
                <div className="col-12">
                  <img src={item.image} alt={item.name} width={"75%"} />
                </div>
                <div className="col-12 mt-5">
                  <h6 style={{ fontWeight: 600 }}>{item.name}</h6>
                  <p>{item.position}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };

  const AdvisorSlider = () => {
    return (
      <Swiper
        slidesPerView="1"
        spaceBetween={30}
        pagination={{ clickable: true }}
      >
        {advisor.map((item, key) => {
          return (
            <SwiperSlide key={key} className="pt-3 mt-3 mb-5">
              <div className="row m-0  justify-content-center align-items-center ">
                <div className="col-12">
                  <img src={item.image} alt={item.name} width={300} />
                </div>
                <div className="col-12 mt-5">
                  <h6 style={{ fontWeight: 600 }}>{item.name}</h6>
                  <p>{item.position}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };

  return (
    <div className="row m-0 justify-content-center align-items-center text-center mt-5 mb-5">
      <div className="col-10 p-0">
        <h1>{Data[lang].title}</h1>
      </div>
      <div className="col-md-5 col-10 p-0">
        <p>{Data[lang].description}</p>
      </div>
      <div className="col-10">
        <AdvisorSlider />
      </div>
      <div className="col-10">
        <TeamSlider />
      </div>
    </div>
  );
};

export default Team;
