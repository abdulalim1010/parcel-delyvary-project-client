import React from "react";
import Marquee from "react-fast-marquee";

import logo1 from "../assets/brands/amazon.png";
import logo2 from "../assets/brands/amazon_vector.png";
import logo3 from "../assets/brands/casio.png";
import logo4 from "../assets/brands/moonstar.png";
import logo5 from "../assets/brands/randstad.png";
import logo6 from "../assets/brands/start-people 1.png";
import logo7 from "../assets/brands/start.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientLogoSlider = () => {
  return (
    <div className="bg-base-100 py-10">
      <h1 className="text-3xl text-green-400 p-4 font-bold text-center mb-6">
        We've helped thousands of sales teams
      </h1>
      <Marquee speed={50} pauseOnHover gradient={false}>
        {logos.map((logo, idx) => (
          <img
            key={idx}
            src={logo}
            alt={`Client Logo ${idx}`}
            className="h-[24px] w-auto mx-[50px] object-contain"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default ClientLogoSlider;
