import React from "react";
import bgImg from "../../../assets/images/banner/banner.jpg";

const Tuneup = () => {
	const styles = {
		backgroundImage: `url('${bgImg}')`,
	};
	return (
		<>
			<section className="video-section">
				<div data-parallax='{"y": 50}' className="sec-bg" style={styles}></div>
				<div className="auto-container">
					<h5>Working since 1992</h5>
					<h2>
						Tuneup Your Car <br /> to Next Level
					</h2>
					<div className="video-box">
						<div className="video-btn">
							<a href="#feature">
								<i className="flaticon-play"></i>
							</a>
						</div>
						<div className="text">
							Discover The <br /> Core Features
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Tuneup;
