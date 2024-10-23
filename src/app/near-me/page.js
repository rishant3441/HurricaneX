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
  const [showFoodBanks, setShowFoodBanks] = useState(true); // New state for showing food banks
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
    <main style={{ flex: 1, overflow: 'auto', height: '100vh' }} className="relative">
      <Stations setStations={setStations} userCoordinates={userCoordinates} />
      <GoogleMap
        userCoordinates={userCoordinates}
        popupInfo={popupInfo}
        setPopupInfo={setPopupInfo}
        showShelters={showShelters}
        showFoodBanks={showFoodBanks} // Pass showFoodBanks state to the map
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
          <span className="text-sm font-medium">Show Hurricane Shelters</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer mt-2">
          <input
            type="checkbox"
            checked={showFoodBanks}
            onChange={(e) => setShowFoodBanks(e.target.checked)} // New toggle for food banks
            className="w-4 h-4 cursor-pointer"
          />
          <span className="text-sm font-medium">Show Food Banks</span>
        </label>
      </div>
    </main>
  );
}

export default Page;
