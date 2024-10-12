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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#1976D2', marginBottom: '20px', textAlign: 'center' }}>Hurricane Safety Guide</h1>

      <Section title="Before a Hurricane">
        <ul>
          <Li>
            <Strong>Know your zone:</Strong> Determine if you live in a
            hurricane evacuation area by contacting your local
            government/emergency management office.
          </Li>
          <Li>
            <Strong>Have a Family Emergency Plan:</Strong> Discuss with your
            family or close friends how you will stay in contact, where you
            will go, and what you will do in an emergency. Keep a copy of this
            plan in your emergency supplies kit or another safe place.
          </Li>
          <Li>
            <Strong>Put Together an Emergency Supplies Kit:</Strong> Create a
            basic disaster supplies kit and consider storage locations for
            different situations. Check emergency equipment, such as
            flashlights, generators, and storm shutters. Navigate to the checklist
            to create and manage a list of key items. 
            .
          </Li>
          <Li>
            <Strong>Review Your Homeowners Insurance:</Strong> Ensure your
            insurance policy has adequate coverage for your home.
          </Li>
          <Li>
            <Strong>Understand NWS forecast products:</Strong> Especially the
            meaning of NWS watches and warnings.
          </Li>
        </ul>
      </Section>

      <Section title="During a Hurricane">
        <ul>
          <Li>
            <Strong>Secure your home:</Strong> Cover all windows with permanent
            storm shutters or 5/8 inch exterior grade or marine plywood. Buy
            supplies before hurricane season.
          </Li>
          <Li>
            <Strong>Stay tuned in:</Strong> Check websites of your local
            National Weather Service office and local government/emergency
            management office. Listen to NOAA Weather Radio or other radio or
            TV stations for storm news.
          </Li>
          <Li>
            <Strong>Follow instructions issued by local officials:</Strong>{' '}
            Evacuate immediately if ordered!
          </Li>
          <Li>
            <Strong>If not ordered to evacuate:</Strong> Take refuge in a small
            interior room, closet, or hallway on the lowest level. Stay away
            from windows, skylights, and glass doors. Be aware that after the
            eye of the storm passes, winds will quickly increase from the
            opposite direction.
          </Li>
        </ul>
      </Section>

      <Section title="After a Hurricane">
        <ul>
          <Li>
            <Strong>Stay informed:</Strong> Continue listening to a NOAA Weather
            Radio or local news for updates. Return home only when officials
            say it is safe.
          </Li>
          <Li>
            <Strong>Stay alert:</Strong> Drive only if necessary and avoid
            flooded roads and washed-out bridges. Watch for fallen objects,
            downed electrical wires, and weakened structures.
          </Li>
          <Li>
            <Strong>Assess the damage:</Strong> Walk carefully around your home
            to check for loose power lines, gas leaks, and structural damage.
          </Li>
          <Li>
            <Strong>Stay safe:</Strong> Avoid buildings if you smell gas, if
            floodwaters remain around the building, or if the building was
            damaged by fire and authorities haven&apos;t declared it safe. Never use
            a portable generator inside your home or garage. Use battery-powered
            flashlights instead of candles.
          </Li>
        </ul>
      </Section>

      <Section title="Watches & Warnings">
        <ul>
          <Li>
            <Strong>Hurricane Watch:</Strong> Hurricane conditions are possible
            within your area. Issued 48 hours before tropical-storm-force winds
            are expected.
          </Li>
          <Li>
            <Strong>Tropical Storm Watch:</Strong> Tropical storm conditions are
            possible within the specified area within 48 hours.
          </Li>
          <Li>
            <Strong>Storm Surge Watch:</Strong> Life-threatening inundation from
            rising water is possible within the specified area within 48 hours.
          </Li>
          <Li>
            <Strong>Hurricane Warning:</Strong> Hurricane conditions are
            expected within the specified area within 36 hours.
          </Li>
          <Li>
            <Strong>Tropical Storm Warning:</Strong> Tropical storm conditions
            are expected within the specified area within 36 hours.
          </Li>
          <Li>
            <Strong>Storm Surge Warning:</Strong> Life-threatening inundation
            from rising water is expected within the specified area within 36
            hours.
          </Li>
          <Li>
            <Strong>Extreme Wind Warning:</Strong> Extreme sustained winds of a
            major hurricane are expected within an hour. Take immediate shelter.
          </Li>
        </ul>
      </Section>

      <footer style={{ marginTop: '40px', textAlign: 'center', color: '#666' }}>
        <p>
          For more information, visit the{' '}
          <a
            href="https://www.weather.gov/safety/hurricane"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1a5f7a', textDecoration: 'underline' }}
          >
            National Weather Service Hurricane Safety
          </a>{' '}
          page.
        </p>
      </footer>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section style={{ marginBottom: '30px' }}>
    <h2 style={{ fontSize: '1.8rem', color: '#1976D2', marginBottom: '15px' }}>{title}</h2>
    {children}
  </section>
);

const Strong = ({ children }) => (
  <span style={{ fontWeight: 'bold' }}>{children}</span>
);

const Li = ({ children }) => (
  <li style={{ marginBottom: '10px' }}>{children}</li>
);

export default Page;