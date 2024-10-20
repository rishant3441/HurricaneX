import React from 'react';
import { AlertTriangle, ShieldCheck, Wind, Droplets, HelpCircle, Home, Car, Battery, Coffee, Zap } from 'lucide-react';

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-500 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <header className="bg-yellow-400 p-6 text-center">
          <h1 className="text-4xl font-bold text-blue-900">Comprehensive Florida Hurricane Safety Guide</h1>
          <p className="text-xl text-blue-800 mt-2">Be Prepared, Stay Safe in the Sunshine State</p>
        </header>
        <div className="p-6">
          <IntroSection />
          <PreparednessSection />
          <SafetySection
            title="Before the Hurricane"
            icon={<ShieldCheck className="w-12 h-12 text-green-500" />}
            bgColor="bg-green-100"
            tips={[
              "Create an emergency supply kit with enough provisions for at least 7 days",
              "Secure important documents in a waterproof container",
              "Trim trees and shrubs around your home",
              "Check and secure all windows and doors",
              "Fill your car with gas and withdraw cash from the ATM",
              "Follow evacuation orders from local officials",
              "Know your evacuation zone - visit FloridaDisaster.org for info",
              "Prepare for your pets - ensure they have ID tags and carriers",
              "Fill bathtubs and large containers with water for sanitation",
              "Charge all electronic devices and backup batteries",
              "Turn your refrigerator and freezer to the coldest setting",
              "Secure outdoor furniture and any loose items",
              "Review your insurance policies and take inventory of your property"
            ]}
          />
          <SafetySection
            title="During the Hurricane"
            icon={<Wind className="w-12 h-12 text-red-500" />}
            bgColor="bg-red-100"
            tips={[
              "Stay indoors and away from windows and glass doors",
              "Close all interior doors and secure exterior doors",
              "Keep curtains and blinds closed",
              "Take refuge in a small interior room, closet, or hallway on the lowest level",
              "Lie on the floor under a table or other sturdy object if the building begins to move",
              "Don't go outside during the eye of the storm - conditions will rapidly become dangerous again",
              "Monitor weather updates via a battery-powered NOAA weather radio",
              "If flooding threatens your home, turn off electricity at the main breaker",
              "Avoid using candles for light - use flashlights instead",
              "Don't use electrical appliances or phones during the storm",
              "If power goes out, turn off major appliances to reduce damage from power surges",
              "Be prepared to evacuate to a shelter or neighbor's home if your home is damaged"
            ]}
          />
          <SafetySection
            title="After the Hurricane"
            icon={<Droplets className="w-12 h-12 text-blue-500" />}
            bgColor="bg-blue-100"
            tips={[
              "Wait for official word that it's safe to return home",
              "Avoid downed power lines and standing water",
              "Don't drink tap water until you know it's safe",
              "Check for gas leaks - if you smell gas, leave immediately and call the fire department",
              "Document any property damage with photographs for insurance purposes",
              "Be cautious of wildlife that may have been displaced by the storm",
              "Use flashlights, not candles, to examine buildings",
              "Help neighbors who may require special assistance",
              "Wear protective clothing during clean-up",
              "Be careful when using chainsaws and other power tools",
              "Don't let children play in floodwater",
              "Discard any food that may have spoiled due to power outages",
              "Watch for mold growth and clean affected areas thoroughly"
            ]}
          />
          <EmergencyKitSection />
          <EvacuationPlanSection />
          <FloodSafetySection />
          <PowerOutageSection />
          <FloridaResources />
          <ReferencesSection />
        </div>
      </div>
    </div>
  );
};

const IntroSection = () => (
  <div className="mb-8 p-6 rounded-lg bg-orange-100">
    <h2 className="text-2xl font-bold mb-4">Understanding Hurricanes in Florida</h2>
    <p className="text-lg mb-4">
      Hurricanes are powerful tropical cyclones that can cause devastating damage to coastal and inland areas. 
      Florida, with its extensive coastline, is particularly vulnerable to these storms. Understanding hurricane 
      risks and being prepared is crucial for all Florida residents.
    </p>
    <p className="text-lg">
      This guide provides comprehensive information on how to prepare for, stay safe during, and recover after a hurricane. 
      Remember, preparation is key to minimizing the impact of these dangerous storms.
    </p>
  </div>
);

const PreparednessSection = () => (
  <div className="mb-8 p-6 rounded-lg bg-yellow-100">
    <div className="flex items-center mb-4">
      <AlertTriangle className="w-12 h-12 text-yellow-500" />
      <h2 className="text-2xl font-bold ml-4">Hurricane Preparedness</h2>
    </div>
    <p className="text-lg mb-4">
      Being prepared for a hurricane can make a significant difference in how you and your family weather the storm. 
      Here are some key steps to take:
    </p>
    <ul className="list-disc pl-6 space-y-2">
      <li className="text-lg">Develop a family emergency plan and practice it regularly</li>
      <li className="text-lg">Know your evacuation zone and route</li>
      <li className="text-lg">Prepare an emergency kit (see Emergency Kit section for details)</li>
      <li className="text-lg">Stay informed about weather conditions and emergency instructions</li>
      <li className="text-lg">Prepare your home by installing storm shutters and trimming trees</li>
      <li className="text-lg">Review and update your insurance policies</li>
    </ul>
  </div>
);

const SafetySection = ({ title, icon, bgColor, tips }) => (
  <div className={`mb-8 p-6 rounded-lg ${bgColor}`}>
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-2xl font-bold ml-4">{title}</h2>
    </div>
    <ul className="list-disc pl-6 space-y-2">
      {tips.map((tip, index) => (
        <li key={index} className="text-lg">{tip}</li>
      ))}
    </ul>
  </div>
);

const EmergencyKitSection = () => (
  <div className="mb-8 p-6 rounded-lg bg-indigo-100">
    <div className="flex items-center mb-4">
      <h2 className="text-2xl font-bold ml-4">Emergency Kit Essentials</h2>
    </div>
    <p className="text-lg mb-4">Your emergency kit should include enough supplies to last at least 7 days:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li className="text-lg">Water (one gallon per person per day)</li>
      <li className="text-lg">Non-perishable food</li>
      <li className="text-lg">Battery-powered or hand-crank radio</li>
      <li className="text-lg">Flashlight and extra batteries</li>
      <li className="text-lg">First aid kit</li>
      <li className="text-lg">Prescription medications and glasses</li>
      <li className="text-lg">Infant formula and diapers</li>
      <li className="text-lg">Pet food and extra water for your pet</li>
      <li className="text-lg">Important family documents in a waterproof container</li>
      <li className="text-lg">Cash and change</li>
      <li className="text-lg">Sleeping bag or warm blanket for each person</li>
      <li className="text-lg">Change of clothes and sturdy shoes</li>
      <li className="text-lg">Household chlorine bleach and medicine dropper</li>
      <li className="text-lg">Fire extinguisher</li>
      <li className="text-lg">Personal hygiene items</li>
      <li className="text-lg">Paper and pencil</li>
      <li className="text-lg">Books, games, puzzles, or other activities</li>
    </ul>
  </div>
);

const EvacuationPlanSection = () => (
  <div className="mb-8 p-6 rounded-lg bg-pink-100">
    <div className="flex items-center mb-4">
      <Car className="w-12 h-12 text-pink-500" />
      <h2 className="text-2xl font-bold ml-4">Evacuation Plan</h2>
    </div>
    <p className="text-lg mb-4">Having a well-thought-out evacuation plan is crucial:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li className="text-lg">Know your evacuation zone and route</li>
      <li className="text-lg">Identify a safe place to stay (e.g., with family, friends, or at a shelter)</li>
      <li className="text-lg">Plan for your pets - not all shelters accept animals</li>
      <li className="text-lg">Keep your vehicle's gas tank at least half full during hurricane season</li>
      <li className="text-lg">Have a physical map in case GPS is unavailable</li>
      <li className="text-lg">Practice your evacuation plan with your family</li>
    </ul>
  </div>
);

const FloodSafetySection = () => (
  <div className="mb-8 p-6 rounded-lg bg-cyan-100">
    <div className="flex items-center mb-4">
      <Droplets className="w-12 h-12 text-cyan-500" />
      <h2 className="text-2xl font-bold ml-4">Flood Safety</h2>
    </div>
    <p className="text-lg mb-4">Flooding is a common and dangerous effect of hurricanes:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li className="text-lg">Never drive through flooded roadways - turn around, don't drown</li>
      <li className="text-lg">Stay off bridges over fast-moving water</li>
      <li className="text-lg">If told to evacuate, do so immediately</li>
      <li className="text-lg">Move to higher ground or a higher floor</li>
      <li className="text-lg">Do not walk through moving water - 6 inches can make you fall</li>
      <li className="text-lg">If trapped in a building, go to its highest level</li>
      <li className="text-lg">Do not touch electrical equipment if you are wet or standing in water</li>
    </ul>
  </div>
);

const PowerOutageSection = () => (
  <div className="mb-8 p-6 rounded-lg bg-amber-100">
    <div className="flex items-center mb-4">
      <Zap className="w-12 h-12 text-amber-500" />
      <h2 className="text-2xl font-bold ml-4">Dealing with Power Outages</h2>
    </div>
    <p className="text-lg mb-4">Power outages are common during hurricanes. Here's how to prepare and cope:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li className="text-lg">Keep freezers and refrigerators closed</li>
      <li className="text-lg">Use a generator outdoors only and away from windows</li>
      <li className="text-lg">Disconnect appliances and electronics to avoid damage from power surges</li>
      <li className="text-lg">Have alternate plans for refrigerating medicines or using power-dependent medical devices</li>
      <li className="text-lg">Check on neighbors, especially those who might need assistance</li>
      <li className="text-lg">Avoid carbon monoxide poisoning by using grills and camp stoves outdoors only</li>
    </ul>
  </div>
);

const FloridaResources = () => (
  <div className="bg-purple-100 p-6 rounded-lg">
    <div className="flex items-center mb-4">
      <HelpCircle className="w-12 h-12 text-purple-500" />
      <h2 className="text-2xl font-bold ml-4">Florida-Specific Resources</h2>
    </div>
    <ul className="list-disc pl-6 space-y-2">
      <li className="text-lg">Florida Division of Emergency Management: <a href="https://www.floridadisaster.org" className="text-blue-600 hover:underline">FloridaDisaster.org</a></li>
      <li className="text-lg">Florida Highway Patrol: <a href="https://www.flhsmv.gov/fhp/" className="text-blue-600 hover:underline">FHP Website</a></li>
      <li className="text-lg">Florida Power & Light Storm Center: <a href="https://www.fpl.com/storm" className="text-blue-600 hover:underline">FPL Storm Center</a></li>
      <li className="text-lg">National Hurricane Center: <a href="https://www.nhc.noaa.gov/" className="text-blue-600 hover:underline">NHC Website</a></li>
      <li className="text-lg">Florida 511 (Traffic Info): <a href="https://fl511.com/" className="text-blue-600 hover:underline">FL511.com</a></li>
    </ul>
  </div>
);

const ReferencesSection = () => (
  <div className="mb-8 p-6 rounded-lg bg-gray-100">
    <div className="flex items-center mb-4">
      <h2 className="text-2xl font-bold ml-4">References</h2>
    </div>
    <ul className="list-disc pl-6 space-y-2">
      <li className="text-lg">
        <a href="https://www.cdc.gov/hurricanes/safety/index.html" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
          CDC - Hurricane Safety
        </a>
      </li>
      <li className="text-lg">
        <a href="https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/hurricane.html#:~:text=Make%20plans%20to%20stay%20safe.%20Determine%20your%20best,knowledge%20you%20will%20need%20when%20the%20storm%20arrives." className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
          Red Cross - How to Prepare for Hurricanes
        </a>
      </li>
      <li className="text-lg">
        <a href="https://www.weather.gov/safety/hurricane" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
          National Weather Service - Hurricane Safety
        </a>
      </li>
    </ul>
  </div>
);

export default Page;