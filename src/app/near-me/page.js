"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import BeatLoader from 'react-spinners/BeatLoader';
import GoogleMap from '@/components/GoogleMap';
import Stations from '@/components/Stations';

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [showShelters, setShowShelters] = useState(true);
  const [showFoodBanks, setShowFoodBanks] = useState(true);
  const [showGasStations, setShowGasStations] = useState(true); // New state for showing gas stations
  const [stations, setStations] = useState([]);

  useEffect(() => {
    if (user == null) {
      router.push("/sign-in");
    }
  }, [user, router]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  if (isLoading) return <BeatLoader cssOverride={style} />;

  return (
    <div style={{ flex: 1, overflow: 'auto', height: '100vh' }} className="relative">
      <Stations setStations={setStations} userCoordinates={userCoordinates} />
      <GoogleMap
        userCoordinates={userCoordinates}
        popupInfo={popupInfo}
        setPopupInfo={setPopupInfo}
        showShelters={showShelters}
        showFoodBanks={showFoodBanks}
        showGasStations={showGasStations} // Pass showGasStations state to the map
        stations={stations}
      />

      {/* Filter Control */}
      <div className="absolute top-4 right-4 p-4 bg-white rounded-lg shadow-lg z-10">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showShelters}
            onChange={(e) => setShowShelters(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="w-4 h-4 inline-block rounded-full" style={{ backgroundColor: '#FF0000', border: '2px solid #FFFFFF' }}></span>
          <span className="text-sm font-medium">Show Hurricane Shelters</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer mt-2">
          <input
            type="checkbox"
            checked={showFoodBanks}
            onChange={(e) => setShowFoodBanks(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="w-4 h-4 inline-block rounded-full" style={{ backgroundColor: '#00FF00', border: '2px solid #FFFFFF' }}></span>
          <span className="text-sm font-medium">Show Food Banks</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer mt-2">
          <input
            type="checkbox"
            checked={showGasStations}
            onChange={(e) => setShowGasStations(e.target.checked)} // New toggle for gas stations
            className="w-4 h-4 cursor-pointer"
          />
          <img src="/fuel-station.png" alt="Gas Station Icon" className="w-4 h-4" />
          <span className="text-sm font-medium">Show Gas Stations</span>
        </label>
      </div>
    </div>
  );
}

export default Page;