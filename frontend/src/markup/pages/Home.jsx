import React from "react";
import Tuneup from "../components/Tuneup/Tuneup.jsx";
import WelcomeHome from "../components/WelcomeHome/WelcomeHome.jsx";
import FeaturedService from "../components/FeaturedService/FeaturedService.jsx";
import QualityService from "../components/QualityService/QualityService.jsx";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs.jsx";
import WorkingSince from "../components/WorkingSince/WorkingSince.jsx";
import Schedule from "../components/Schedule/Schedule.jsx";

function Home(props) {
  return (
    <>
      <Tuneup />
      <WelcomeHome />
      <FeaturedService />
      <QualityService />
      <WhyChooseUs />
      <WorkingSince />
      <Schedule />
    </>
  );
}

export default Home;
