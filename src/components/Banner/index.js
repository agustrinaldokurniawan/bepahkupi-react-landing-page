import React, { useEffect, useState, Suspense } from "react";

import LargeBanner from "./largebanner";
import SmallBanner from "./smallBanner";

import smallBannerImage from "../../assets/images/smallBanner.png";
import largeBannerImage from "../../assets/images/largeBanner.png";

import Utils from "../../utils/device";

const Banner = () => {
  const { screenWidth } = Utils();
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    setBanners([]);
  }, []);

  const Content = () => {
    return screenWidth > 800 ? (
      <LargeBanner banners={banners} />
    ) : (
      <SmallBanner banners={banners} />
    );
  };

  const Loading = <div>Loading...</div>;

  return (
    <Suspense fallback={Loading}>
      <Content />
    </Suspense>
  );
};

export default Banner;
