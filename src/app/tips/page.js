'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { BeatLoader } from 'react-spinners';
import 'mapbox-gl/dist/mapbox-gl.css';

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (user == null) {
    } else {
      setLoading(false);
    }
  }, [user]);

  if (isLoading) {
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
        <HurricaneSafetyGuide />
      </div>
    </div>
  );
}

const HurricaneSafetyGuide = () => {
  return (
    <div>
      <h1>Hurricane Safety Guide</h1>

      <section>
        <h2>Before a Hurricane</h2>
        <ul>
          <li>
            <strong>Know your zone:</strong> Determine if you live in a
            hurricane evacuation area by contacting your local
            government/emergency management office.
          </li>
          <li>
            <strong>Have a Family Emergency Plan:</strong> Discuss with your
            family or close friends how you will stay in contact, where you
            will go, and what you will do in an emergency. Keep a copy of this
            plan in your emergency supplies kit or another safe place.
          </li>
          <li>
            <strong>Put Together an Emergency Supplies Kit:</strong> Create a
            basic disaster supplies kit and consider storage locations for
            different situations. Check emergency equipment, such as
            flashlights, generators, and storm shutters. For a list of key
            items, visit{' '}
            <a
              href="http://www.ready.gov/kit"
              target="_blank"
              rel="noopener noreferrer"
            >
              ready.gov/kit
            </a>
            .
          </li>
          <li>
            <strong>Review Your Homeowners Insurance:</strong> Ensure your
            insurance policy has adequate coverage for your home.
          </li>
          <li>
            <strong>Understand NWS forecast products:</strong> Especially the
            meaning of NWS watches and warnings.
          </li>
        </ul>
      </section>

      <section>
        <h2>During a Hurricane</h2>
        <ul>
          <li>
            <strong>Secure your home:</strong> Cover all windows with permanent
            storm shutters or 5/8 inch exterior grade or marine plywood. Buy
            supplies before hurricane season.
          </li>
          <li>
            <strong>Stay tuned in:</strong> Check websites of your local
            National Weather Service office and local government/emergency
            management office. Listen to NOAA Weather Radio or other radio or
            TV stations for storm news.
          </li>
          <li>
            <strong>Follow instructions issued by local officials:</strong>{' '}
            Evacuate immediately if ordered!
          </li>
          <li>
            <strong>If not ordered to evacuate:</strong> Take refuge in a small
            interior room, closet, or hallway on the lowest level. Stay away
            from windows, skylights, and glass doors. Be aware that after the
            eye of the storm passes, winds will quickly increase from the
            opposite direction.
          </li>
        </ul>
      </section>

      <section>
        <h2>After a Hurricane</h2>
        <ul>
          <li>
            <strong>Stay informed:</strong> Continue listening to a NOAA Weather
            Radio or local news for updates. Return home only when officials
            say it is safe.
          </li>
          <li>
            <strong>Stay alert:</strong> Drive only if necessary and avoid
            flooded roads and washed-out bridges. Watch for fallen objects,
            downed electrical wires, and weakened structures.
          </li>
          <li>
            <strong>Assess the damage:</strong> Walk carefully around your home
            to check for loose power lines, gas leaks, and structural damage.
          </li>
          <li>
            <strong>Stay safe:</strong> Avoid buildings if you smell gas, if
            floodwaters remain around the building, or if the building was
            damaged by fire and authorities haven't declared it safe. Never use
            a portable generator inside your home or garage. Use battery-powered
            flashlights instead of candles.
          </li>
        </ul>
      </section>

      <section>
        <h2>Watches & Warnings</h2>
        <ul>
          <li>
            <strong>Hurricane Watch:</strong> Hurricane conditions are possible
            within your area. Issued 48 hours before tropical-storm-force winds
            are expected.
          </li>
          <li>
            <strong>Tropical Storm Watch:</strong> Tropical storm conditions are
            possible within the specified area within 48 hours.
          </li>
          <li>
            <strong>Storm Surge Watch:</strong> Life-threatening inundation from
            rising water is possible within the specified area within 48 hours.
          </li>
          <li>
            <strong>Hurricane Warning:</strong> Hurricane conditions are
            expected within the specified area within 36 hours.
          </li>
          <li>
            <strong>Tropical Storm Warning:</strong> Tropical storm conditions
            are expected within the specified area within 36 hours.
          </li>
          <li>
            <strong>Storm Surge Warning:</strong> Life-threatening inundation
            from rising water is expected within the specified area within 36
            hours.
          </li>
          <li>
            <strong>Extreme Wind Warning:</strong> Extreme sustained winds of a
            major hurricane are expected within an hour. Take immediate shelter.
          </li>
        </ul>
      </section>

      <footer>
        <p>
          For more information, visit the{' '}
          <a
            href="https://www.weather.gov/safety/hurricane"
            target="_blank"
            rel="noopener noreferrer"
          >
            National Weather Service Hurricane Safety
          </a>{' '}
          page.
        </p>
      </footer>
    </div>
  );
};

export default Page;
