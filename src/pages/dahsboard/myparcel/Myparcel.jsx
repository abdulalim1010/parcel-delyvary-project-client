import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../../hooks/UseAuth';
import UseAxiuosSequre from '../../../hooks/UseAxiuosSequre';

const Myparcel = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiuosSequre();

  const {
    data: parcels = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['my-parcel', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center">Loading parcels...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load parcels.</p>;
  if (parcels.length === 0) return <p className="text-center">No parcels found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Parcels ({parcels.length})</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Weight</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.title}</td>
                <td>{parcel.type}</td>
                <td>{parcel.weight || '-'}</td>
                <td>
                  <span className={`badge ${parcel.status === 'Delivered' ? 'badge-success' : 'badge-warning'}`}>
                    {parcel.status}
                  </span>
                </td>
                <td>{new Date(parcel.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Myparcel;
