import React from 'react';
import heroimage from '../../assets/location-merchant.png'
const BecomeMarchent = () => {
  return (
    <div className="" >
      <div  data-aos="fade-down-right" className="bg-no-repeat  bg-[url('assets/be-a-merchant-bg.png')] bg-[#03373D] rounded-4xl p-4">
  <div className="hero-content flex-col items-center lg:flex-row-reverse">
    <img
 src={heroimage }
    />
    <div>
      <h1 className="text-5xl text-white font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
      <p className="py-6 text-white">
      We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
      </p>
            <div className='flex justify-end mt-4 gap-4'>
            <button className="btn bg-[#CAEB66] rounded-3xl">Become a Merchant</button>
            <button className="border border-[#CAEB66] text-[#CAEB66] p-2 rounded-3xl ml-4">
  Earn with Profast Courier
</button>
     </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default BecomeMarchent;