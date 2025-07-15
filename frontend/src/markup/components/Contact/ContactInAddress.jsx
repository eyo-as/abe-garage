import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const ContactAddress = () => {
	return (
		<>
			<section className="about-section">
				<div className="auto-container">
					<div className="row">
						<div className="col-lg-6 pl-lg-6">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126115.11523351159!2d38.7781448!3d8.96317685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1725193692911!5m2!1sen!2set"
								width="550"
								height="450"
								style={{ border: 0 }}
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							></iframe>
						</div>
						<div className="col-lg-6 pl-lg-6 contact_padding">
							<div className="sec-title">
								<h2>Our Address</h2>
								<div className="text">
									<p>
										Completely synergize resource taxing relationships via
										premier niche markets. Professionally cultivate one-to-one
										customer service.
									</p>
									<div className="contact-item">
										<h3>
											<IoLocationOutline className="red-icon" /> Address:
										</h3>
										<p>Bole Ring Road, Addis Abeba, Ethiopia</p>
									</div>
									<div className="contact-item">
										<h3>
											<MdOutlineMailOutline className="red-icon" /> Email:
										</h3>
										<p>Contact@abegarage.com</p>
									</div>
									<div className="contact-item">
										<h3>
											<FaPhoneAlt className="red-icon" /> Phone:
										</h3>
										<p>+251 999 999 999</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ContactAddress;
