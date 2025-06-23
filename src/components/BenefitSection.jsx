// BenefitSection.jsx
import React from "react";
import binFitData from '../../src/three.json'

const BenefitSection = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">
        Why Choose Us
      </h2>
      <div className="space-y-8">
      {binFitData.map(({ id, title, description, image }) => (
  <div
    key={id}
    className="card card-side bg-base-100 shadow-md flex flex-col md:flex-row items-center p-4"
  >
    {/* Image with right dashed border */}
    <figure className="w-full md:w-1/3 px-4 border-r-2 border-dashed border-gray-300 pr-6">
      <img
        src={image}
        alt={title}
        className="rounded-xl w-full h-auto max-h-40 object-contain"
      />
    </figure>

    {/* Text content */}
    <div className="card-body md:w-2/3 pl-6">
      <h3 className="card-title text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
))}

      </div>
    </section>
  );
};

export default BenefitSection;
