# HurricaneX
Easy to use hurricane readiness web app. Our submission for the Congressional App Challenge. 

## Live Production Build
### [HurricaneX](https://hurricane-x.vercel.app)

## Technologies Used
- NextJS
- Google Maps API
- Firebase Authentication + Firestore
- Mapbox
- NWS API
- Weather Models from the Iowa Environmental Mesonet
- GasBuddies API
- Browser Geolocation

## How to Build Locally
### Requirements
- Google Maps API Key
- Mapbox API Key
- Firebase API Access

1. Clone this repository and enter it.
2. Run ```npm install```
3. Setup your API keys in the following format inside a .env file:
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN1=
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```
4. Run ```npm run dev```
