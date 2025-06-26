import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../../hooks/UseAuth';
import UseAxiuosSequre from '../../../hooks/UseAxiuosSequre';

const Myparcel = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiuosSequre();

  const { data: parcels = [], isLoading, isError } = useQuery({
    queryKey: ['my-parcel', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading parcels...</p>;
  if (isError) return <p>Failed to load parcels.</p>;
  if (parcels.length === 0) return <p>No parcels found.</p>;

  return (
    <div>
      <h1>Parcel is coming: {parcels.length}</h1>
    </div>
  );
};

export default Myparcel;
