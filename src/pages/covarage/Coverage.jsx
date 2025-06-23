// src/pages/Coverage.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import districtsData from '../../../data/warehouses.json'; 

// Fix missing Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

const Coverage = () => {
  const [search, setSearch] = useState("");
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    setDistricts(districtsData); // load from JSON
  }, []);

  const filteredDistricts = districts.filter((d) =>
    d.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-primary text-center mb-6">
        We are available in 64 districts
      </h1>

      {/* Search Box */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search district..."
          className="input input-bordered w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* District Chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {filteredDistricts.map((d) => (
          <span
            key={d.district}
            className="badge badge-outline badge-primary text-sm"
          >
            {d.district}
          </span>
        ))}
      </div>

      {/* Map */}
      <div className="h-[500px] w-full">
        <MapContainer
          center={[23.685, 90.3563]} // Center of Bangladesh
          zoom={7}
          scrollWheelZoom={false}
          className="h-full w-full rounded-xl shadow"
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredDistricts.map((d, i) => (
            <Marker key={i} position={[d.latitude, d.longitude]}>
              <Popup>
                <strong>{d.district}</strong>
                <br />
                Region: {d.region}
                <br />
                Areas: {d.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
