import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../hooks/UseAuth';


const regionDistrictMap = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj"],
  Chittagong: ["Chittagong", "Cox's Bazar", "Comilla"],
  Rajshahi: ["Rajshahi", "Bogra", "Pabna"],
  // Add more regions and districts as needed
};

const BeARider = () => {
  const { user } = UseAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const selectedRegion = watch('region');

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      name: user?.displayName || '',
      status: 'pending', // default status
    };
    console.log('Submitted Rider Application:', finalData);
    // Send to your server here
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Be A Rider</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            defaultValue={user?.displayName || ''}
            readOnly
            {...register('name')}
            className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-700"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block font-semibold mb-1">Age</label>
          <input
            type="number"
            {...register('age', { required: true })}
            placeholder="Enter your age"
            className="w-full px-3 py-2 border rounded"
          />
          {errors.age && <p className="text-red-500 text-sm">Age is required</p>}
        </div>

        {/* Region */}
        <div>
          <label className="block font-semibold mb-1">Region</label>
          <select
            {...register('region', { required: true })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Region</option>
            {Object.keys(regionDistrictMap).map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          {errors.region && <p className="text-red-500 text-sm">Region is required</p>}
        </div>

        {/* District */}
        <div>
          <label className="block font-semibold mb-1">District</label>
          <select
            {...register('district', { required: true })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select District</option>
            {selectedRegion &&
              regionDistrictMap[selectedRegion]?.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
          </select>
          {errors.district && <p className="text-red-500 text-sm">District is required</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-semibold mb-1">Phone Number</label>
          <input
            type="tel"
            {...register('phone', { required: true })}
            placeholder="Enter your phone number"
            className="w-full px-3 py-2 border rounded"
          />
          {errors.phone && <p className="text-red-500 text-sm">Phone number is required</p>}
        </div>

        {/* NID Number */}
        <div>
          <label className="block font-semibold mb-1">NID Number</label>
          <input
            type="text"
            {...register('nid', { required: true })}
            placeholder="Enter your NID number"
            className="w-full px-3 py-2 border rounded"
          />
          {errors.nid && <p className="text-red-500 text-sm">NID number is required</p>}
        </div>

        {/* Bike Brand */}
        <div>
          <label className="block font-semibold mb-1">Bike Brand</label>
          <input
            type="text"
            {...register('bikeBrand', { required: true })}
            placeholder="Enter your bike brand"
            className="w-full px-3 py-2 border rounded"
          />
          {errors.bikeBrand && <p className="text-red-500 text-sm">Bike brand is required</p>}
        </div>

        {/* Bike Registration Number */}
        <div>
          <label className="block font-semibold mb-1">Bike Registration Number</label>
          <input
            type="text"
            {...register('bikeRegNumber', { required: true })}
            placeholder="Enter your bike registration number"
            className="w-full px-3 py-2 border rounded"
          />
          {errors.bikeRegNumber && <p className="text-red-500 text-sm">Registration number is required</p>}
        </div>

        {/* Hidden Status Field */}
        <input type="hidden" value="pending" {...register('status')} />

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeARider;
