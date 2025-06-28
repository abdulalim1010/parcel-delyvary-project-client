import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UseAuth from '../../hooks/UseAuth';
import UseAxiuosSequre from '../../hooks/UseAxiuosSequre';

// Region to District mapping
const regionDistrictMap = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj"],
  Chittagong: ["Chattogram", "Cox's Bazar", "Comilla"],
  Rajshahi: ["Rajshahi", "Pabna", "Natore"],
  Khulna: ["Khulna", "Jessore", "Satkhira"],
  Barisal: ["Barisal", "Bhola", "Patuakhali"],
  Sylhet: ["Sylhet", "Moulvibazar", "Sunamganj"],
  Rangpur: ["Rangpur", "Dinajpur", "Thakurgaon"],
  Mymensingh: ["Mymensingh", "Netrokona", "Sherpur"]
};

// 🔧 Tracking ID generator
const generateTrackingId = () => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TRK-${timestamp}-${randomPart}`;
};

const ParcelForm = () => {
  const { user } = UseAuth();
  const axiousSecure = UseAxiuosSequre();

  const creatorEmail = user?.email || 'unknown';
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [senderRegion, setSenderRegion] = useState("");
  const [receiverRegion, setReceiverRegion] = useState("");

  const type = watch("type");
  const weight = parseFloat(watch("weight") || 0);
  const senderCenter = watch("sender_service_center");
  const receiverCenter = watch("receiver_service_center");

  const onSubmit = (data) => {
    const isSameCity = senderCenter === receiverCenter;
    const parcelType = type;
    let cost = 0;

    if (parcelType === "document") {
      cost = isSameCity ? 60 : 80;
    } else if (parcelType === "non-document") {
      if (weight <= 3) {
        cost = isSameCity ? 110 : 150;
      } else {
        const extraKg = weight - 3;
        const extraCharge = extraKg * 40;
        cost = isSameCity
          ? 110 + extraCharge
          : 150 + extraCharge + 40;
      }
    }

    const trackingId = generateTrackingId();

    Swal.fire({
      title: 'Confirm Parcel Delivery',
      icon: 'info',
      html: `
        <div style="text-align: left; font-size: 15px">
          <p><strong>📦 Type:</strong> ${parcelType}</p>
          ${parcelType === 'non-document' ? `<p><strong>📏 Weight:</strong> ${weight} kg</p>` : ''}
          <p><strong>🚚 Route:</strong> ${senderCenter} ➡ ${receiverCenter}</p>
          <hr style="margin: 8px 0;" />
          <div>
            <p><strong>🔍 Price Breakdown:</strong></p>
            <ul style="margin-left: 16px">
              ${
                parcelType === 'document'
                  ? `<li>Base Price: ৳${isSameCity ? 60 : 80}</li>`
                  : `
                    <li>Base Price (up to 3kg): ৳${isSameCity ? 110 : 150}</li>
                    ${
                      weight > 3
                        ? `<li>Extra ${weight - 3}kg × ৳40 = ৳${(weight - 3) * 40}</li>
                           ${!isSameCity ? '<li>Extra Intercity Charge: ৳40</li>' : ''}`
                        : ''
                    }
                  `
              }
            </ul>
            <hr style="margin: 8px 0;" />
            <p style="font-size: 18px"><strong>💰 Total Cost: <span style="color:green">৳${cost}</span></strong></p>
            <p style="font-size: 16px"><strong>📦 Tracking ID:</strong> <code>${trackingId}</code></p>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: '✅ Proceed to Payment',
      cancelButtonText: '🔙 Go Back',
      reverseButtons: true,
      customClass: {
        confirmButton: 'bg-green-600 text-white px-4 py-2 rounded',
        cancelButton: 'bg-gray-400 text-white px-4 py-2 rounded'
      }
    }).then(result => {
      if (result.isConfirmed) {
        const finalData = {
          ...data,
          delivery_cost: cost,
          tracking_id: trackingId,
          creation_date: new Date().toISOString(),
          creator_email: creatorEmail,
          sender_email: data.sender_contact + '@placeholder.com'
        };

        axiousSecure.post('/parcels', finalData)
          .then(res => {
            if (res.data?.insertedId || res.status === 201) {
              Swal.fire({
                title: '✅ Parcel Submitted!',
                html: `Your parcel has been successfully submitted.<br/><strong>Tracking ID:</strong> <code>${trackingId}</code>`,
                icon: 'success'
              });
              reset();
            } else {
              Swal.fire('❌ Error', 'Something went wrong while submitting the parcel.', 'error');
            }
          })
          .catch(err => {
            console.error('Parcel submit error:', err);
            Swal.fire('❌ Error', err.message || 'Submission failed', 'error');
          });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-2">Send Your Parcel</h2>
      <p className="text-center text-gray-600 mb-6">Fill in the required information to schedule your delivery.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <fieldset className="border p-4 rounded-xl">
          <legend className="text-lg font-semibold">Parcel Info</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="label">Type</label>
              <select className="select select-bordered w-full" {...register("type", { required: true })}>
                <option value="">Select Type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm">Parcel type is required</p>}
            </div>
            <div>
              <label className="label">Parcel Title</label>
              <input type="text" className="input input-bordered w-full" {...register("title", { required: true })} placeholder="e.g. Official Papers / Books" />
              {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
            </div>
            {type === "non-document" && (
              <div>
                <label className="label">Weight (kg)</label>
                <input type="number" step="0.01" className="input input-bordered w-full"
                  {...register("weight", {
                    required: type === "non-document",
                    min: 0.1,
                    valueAsNumber: true
                  })}
                  placeholder="e.g. 2.5"
                />
                {errors.weight && <p className="text-red-500 text-sm">Weight is required</p>}
              </div>
            )}
          </div>
        </fieldset>

        <div className='flex flex-col md:flex-row gap-4'>
          {/* Sender Info */}
          <fieldset className="border p-4 rounded-xl flex-1">
            <legend className="text-lg font-semibold">Sender Info</legend>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <input className="input input-bordered w-full" placeholder="Name" {...register("sender_name", { required: true })} />
              <input className="input input-bordered w-full" placeholder="Contact" {...register("sender_contact", { required: true })} />
              <select className="select select-bordered w-full" {...register("sender_region", { required: true })} onChange={(e) => setSenderRegion(e.target.value)}>
                <option value="">Select Region</option>
                {Object.keys(regionDistrictMap).map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <select className="select select-bordered w-full" {...register("sender_service_center", { required: true })} disabled={!senderRegion}>
                <option value="">Select District</option>
                {regionDistrictMap[senderRegion]?.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <input className="input input-bordered w-full" placeholder="Address" {...register("sender_address", { required: true })} />
              <textarea className="textarea textarea-bordered w-full" placeholder="Pickup Instruction" {...register("pickup_instruction", { required: true })}></textarea>
            </div>
          </fieldset>

          {/* Receiver Info */}
          <fieldset className="border p-4 rounded-xl flex-1">
            <legend className="text-lg font-semibold">Receiver Info</legend>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <input className="input input-bordered w-full" placeholder="Name" {...register("receiver_name", { required: true })} />
              <input className="input input-bordered w-full" placeholder="Contact" {...register("receiver_contact", { required: true })} />
              <select className="select select-bordered w-full" {...register("receiver_region", { required: true })} onChange={(e) => setReceiverRegion(e.target.value)}>
                <option value="">Select Region</option>
                {Object.keys(regionDistrictMap).map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <select className="select select-bordered w-full" {...register("receiver_service_center", { required: true })} disabled={!receiverRegion}>
                <option value="">Select District</option>
                {regionDistrictMap[receiverRegion]?.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <input className="input input-bordered w-full" placeholder="Address" {...register("receiver_address", { required: true })} />
              <textarea className="textarea textarea-bordered w-full" placeholder="Delivery Instruction" {...register("delivery_instruction", { required: true })}></textarea>
            </div>
          </fieldset>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary px-10">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ParcelForm;
