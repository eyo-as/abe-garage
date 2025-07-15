import React from "react";
import Schedule from "../components/Schedule/Schedule.jsx";
import ContactHeader from "../components/Contact/ContactHeader.jsx";
import ContactAddress from "../components/Contact/ContactInAddress.jsx";

function Contact(props) {
  return (
    <>
      <ContactHeader />
      <ContactAddress />
      <Schedule />
    </>
  );
}

export default Contact;
