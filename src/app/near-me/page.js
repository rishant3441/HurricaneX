"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '@/context/AuthContext';
import BeatLoader from 'react-spinners/BeatLoader';
import GoogleMap from '@/components/GoogleMap';

function Page() {
  const { user } = useAuthContext();
  //const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    if (user == null) router.push("/sign-in");
  }, [user]);

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
    <main style={{ flex: 1 }}>
      <GoogleMap
        userCoordinates={userCoordinates}
        popupInfo={popupInfo}
        setPopupInfo={setPopupInfo}
      />
    </main>
  );
}

export default Page;