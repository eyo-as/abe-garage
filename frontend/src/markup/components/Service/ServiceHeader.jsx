import React from "react";
import bgImg from "../../../assets/images/banner/service_banner.jpg";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

const ServiceHeader = () => {
	const styles = {
		backgroundImage: `url('${bgImg}')`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
	};
	return (
		<>
			<section className="video-section">
				<div data-parallax='{"y": 50}' className="sec-bg" style={styles}></div>
				<div className="auto-container">
					<h2>Service</h2>
					<div className="video-box">
						<div className="text">
							<Link to="/" className="white_home">
								Home
							</Link>
							<FaAngleRight />
							<Link className="white_aboutUs">Service</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ServiceHeader;
