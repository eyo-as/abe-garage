import React from "react";
import bgImg from "../../../assets/images/banner/aboutUs_banner.jpg";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

const ContactHeader = () => {
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
					<h2>Contact Us</h2>
					<div className="video-box">
						<div className="text">
							<Link to="/" className="white_home">
								Home
							</Link>
							<FaAngleRight />
							<Link className="white_aboutUs">Contact Us</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ContactHeader;
