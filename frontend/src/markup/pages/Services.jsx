import React from "react";
import FeaturedService from "../components/FeaturedService/FeaturedService.jsx";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs.jsx";
import WorkingSince from "../components/WorkingSince/WorkingSince.jsx";
import Schedule from "../components/Schedule/Schedule.jsx";
import ServiceHeader from "../components/Service/ServiceHeader.jsx";

function Services(props) {
	return (
		<>
			<ServiceHeader />
			<FeaturedService />
			<WhyChooseUs />
			<WorkingSince />
			<Schedule />
		</>
	);
}

export default Services;
