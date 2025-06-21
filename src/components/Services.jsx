// Services.jsx
import ServiceCard from "../components/ServiceCard";
import { services } from "../components/servicesData";

const Services = () => {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl text-gray-600">
        Our Services
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      <div  data-aos="zoom-in-down" className="grid gap-6  sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, idx) => (
          <ServiceCard key={idx} service={service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
