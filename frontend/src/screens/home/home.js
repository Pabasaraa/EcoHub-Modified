import React from "react";

// Common components
import Slide from "./home.slide";
import Feature from "./home.features";
import Items from "./home.items";
import Qulity from "./home.qulity";
import AboutUs from "./home.aboutUs";
import HomeServices from "./home.services";

const Home = () => {
  return (
    <>
      <Slide />
      <Feature />
      <HomeServices />
      <Items />
      <Qulity />
      <AboutUs />
    </>
  );
};

export default Home;
