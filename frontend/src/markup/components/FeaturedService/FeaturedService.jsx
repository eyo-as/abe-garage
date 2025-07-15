import React, { useState } from "react";
import { serviceData } from "./data";

const FeaturedService = () => {
  const [showMore, setShowMore] = useState([]);

  const handleReadMoreClick = (index) => {
    const currentExpanded = [...showMore];

    if (currentExpanded.includes(index)) {
      // Remove the index if it's already expanded
      setShowMore(currentExpanded.filter((i) => i !== index));
    } else {
      // Add the index if it's not expanded
      setShowMore([...currentExpanded, index]);
    }
  };

  return (
    <>
      <section className="services-section" id="feature">
        <div className="auto-container">
          <div className="sec-title style-two">
            <h2>Our Services</h2>
            <div className="text">
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution.{" "}
            </div>
          </div>
          <div className="row">
            {serviceData.map((service, index) => (
              <div
                className="col-lg-4 service-block-one"
                key={index}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div
                  className="inner-box hvr-float-shadow"
                  style={{ minHeight: "200px" }}
                >
                  <h5>{service.title}</h5>
                  <h2>{service.subtitle}</h2>
                  <button
                    className="read-more text-danger"
                    onClick={() => handleReadMoreClick(index)}
                    style={{ marginBottom: "10px" }}
                  >
                    {showMore.includes(index) ? "Read Less" : "Read More"}
                  </button>
                  <div className="icon">
                    <span className={service.icon}></span>
                  </div>
                  {showMore.includes(index) && <p>{service.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedService;
