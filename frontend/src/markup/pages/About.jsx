import React from "react";
import WelcomeHome from "../components/WelcomeHome/WelcomeHome.jsx";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs.jsx";
import WorkingSince from "../components/WorkingSince/WorkingSince.jsx";
import Schedule from "../components/Schedule/Schedule.jsx";
import AboutIntroduction from "../components/AboutIntroduction/AboutIntroduction.jsx";
import AboutHeader from "../components/AboutHeader/AboutHeader.jsx";

function About(props) {
  return (
    <>
      <AboutHeader />
      <AboutIntroduction />
      <WelcomeHome />
      <WhyChooseUs />
      <WorkingSince />
      <Schedule />
    </>
  );
}

export default About;
