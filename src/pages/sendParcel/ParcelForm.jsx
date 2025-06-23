import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ParcelForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [deliveryCost, setDeliveryCost] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const type = watch("type");

  const onSubmit = (data) => {
    // Cost calculation logic
    let baseCost = data.type === "document" ? 50 : 100;
    let weightCost = data.type === "non-document" && data.weight ? parseFloat(data.weight) * 10 : 0;
    const totalCost = baseCost + weightCost;

    setDeliveryCost(totalCost);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    const parcelData = {
      ...watch(),
      creation_date: new Date().toISOString(),
    };
    console.log("Parcel saved:", parcelData);
    // Save parcelData to DB here
    setShowConfirm(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-2">Send Your Parcel</h2>
      <p className="text-center text-gray-600 mb-6">Fill in the required information to schedule your delivery.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info Section */}
        <fieldset className="border p-4 rounded-xl">
          <legend className="text-lg font-semibold">Parcel Info</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="label">Type</label>
              <select className="select select-bordered w-full"
                {...register("type", { required: true })}>
                <option value="">Select Type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm">Parcel type is required</p>}
            </div>
            <div>
              <label className="label">Title</label>
              <input type="text" className="input input-bordered w-full"
                {...register("title", { required: true })} />
              {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
            </div>
            {type === "non-document" && (
              <div>
                <label className="label">Weight (kg)</label>
                <input type="number" step="0.01" className="input input-bordered w-full"
                  {...register("weight")} />
              </div>
            )}
          </div>
        </fieldset>

        {/* Sender Info Section */}
        <fieldset className="border p-4 rounded-xl">
          <legend className="text-lg font-semibold">Sender Info</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="label">Sender Name</label>
              <input type="text" className="input input-bordered w-full"
                defaultValue="John Doe"
                {...register("sender_name", { required: true })} />
            </div>
            <div>
              <label className="label">Contact</label>
              <input type="text" className="input input-bordered w-full"
                {...register("sender_contact", { required: true })} />
            </div>
            <div>
              <label className="label">Region</label>
              <input type="text" className="input input-bordered w-full"
                {...register("sender_region", { required: true })} />
            </div>
            <div>
              <label className="label">Service Center</label>
              <input type="text" className="input input-bordered w-full"
                {...register("sender_service_center", { required: true })} />
            </div>
            <div>
              <label className="label">Address</label>
              <input type="text" className="input input-bordered w-full"
                {...register("sender_address", { required: true })} />
            </div>
            <div>
              <label className="label">Pickup Instruction</label>
              <textarea className="textarea textarea-bordered w-full"
                {...register("pickup_instruction", { required: true })}></textarea>
            </div>
          </div>
        </fieldset>

        {/* Receiver Info Section */}
        <fieldset className="border p-4 rounded-xl">
          <legend className="text-lg font-semibold">Receiver Info</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="label">Receiver Name</label>
              <input type="text" className="input input-bordered w-full"
                {...register("receiver_name", { required: true })} />
            </div>
            <div>
              <label className="label">Contact</label>
              <input type="text" className="input input-bordered w-full"
                {...register("receiver_contact", { required: true })} />
            </div>
            <div>
              <label className="label">Region</label>
              <input type="text" className="input input-bordered w-full"
                {...register("receiver_region", { required: true })} />
            </div>
            <div>
              <label className="label">Service Center</label>
              <input type="text" className="input input-bordered w-full"
                {...register("receiver_service_center", { required: true })} />
            </div>
            <div>
              <label className="label">Address</label>
              <input type="text" className="input input-bordered w-full"
                {...register("receiver_address", { required: true })} />
            </div>
            <div>
              <label className="label">Delivery Instruction</label>
              <textarea className="textarea textarea-bordered w-full"
                {...register("delivery_instruction", { required: true })}></textarea>
            </div>
          </div>
        </fieldset>

        <div className="text-center">
          <button className="btn btn-primary px-10">Submit</button>
        </div>
      </form>

      {/* Toast & Confirm */}
      {showConfirm && (
        <div className="toast toast-center z-50">
          <div className="alert alert-info shadow-lg">
            <div>
              <span>Total Delivery Cost: <strong>৳{deliveryCost}</strong></span>
            </div>
            <button className="btn btn-sm btn-success ml-4" onClick={handleConfirm}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParcelForm;
