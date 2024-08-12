'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { BeatLoader } from 'react-spinners';
import 'mapbox-gl/dist/mapbox-gl.css';

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checklist, setChecklist] = useState([
    { item: 'Water (one gallon per person per day for at least three days)', acquired: false },
    { item: 'Food (at least a three-day supply of non-perishable food)', acquired: false },
    { item: 'Battery-powered or hand crank radio and a NOAA Weather Radio', acquired: false },
    { item: 'Flashlight and extra batteries', acquired: false },
    { item: 'First aid kit', acquired: false },
    { item: 'Local maps', acquired: false },
    // Add more items as necessary
  ]);

  useEffect(() => {
    if (user && searchParams.get('redirect')) {
      router.push(searchParams.get('redirect'));
    }
  }, [user]);

  const handleCheckboxChange = (index) => {
    const newChecklist = [...checklist];
    newChecklist[index].acquired = !newChecklist[index].acquired;
    setChecklist(newChecklist);
    // Here, you could also add logic to save the updated checklist to a database for the logged-in user
  };

  if (user === undefined) {
    // Add a fallback loading state while user state is being determined
    return (
      <BeatLoader
        cssOverride={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }

  const handleSignInClick = () => {
    const currentUrl = encodeURIComponent(window.location.pathname);
    router.push(`/sign-in?redirect=${currentUrl}`);
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
      <div
        style={{
          width: '100vw',
          height: '100%',
          padding: '10px',
          overflowY: 'auto',
          backgroundColor: '#f5f5f5',
        }}
      >
        <h1>Hurricane Preparation Checklist</h1>
        {user ? (
          <ul>
            {checklist.map((item, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.acquired}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  {item.item}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p>Please log in to create and save your own checklist.</p>
            <button
              onClick={handleSignInClick}
              style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Go to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
