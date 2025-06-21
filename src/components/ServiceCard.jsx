import React from 'react';

const ServiceCard = ({ service }) => {
  const {icon:Icon,title,description}=service
  return (
    <div data-aos="fade-up"
    data-aos-duration="3000" className="card bg-white  hover:bg-[#CAEB66]  shadow-md hover:shadow-xl transition duration-300">
    <div className="card-body items-center text-center">
      <Icon className="text-4xl text-primary" />
      <h2 className="card-title text-lg font-semibold mt-2">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
  );
};

export default ServiceCard;
