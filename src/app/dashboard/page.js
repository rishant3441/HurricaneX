'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/config';
import { updatePassword } from 'firebase/auth';
import { Box, Button, Input, Stack, Text, useToast } from '@chakra-ui/react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [userAddress, setUserAddress] = useState('');
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsGoogleUser(user.providerData.some(provider => provider.providerId === 'google.com'));
      } else {
        router.push('/sign-in'); // Redirect to sign-in page if not authenticated
      }
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserCoordinates(coordinates);
          setLocationEnabled(true);
          reverseGeocode(coordinates);
        },
        (error) => {
          console.error('Error getting user location:', error);
          setLocationEnabled(false);
        }
      );
    }

    return () => unsubscribe();
  }, [router]);

  const reverseGeocode = async ({ lat, lng }) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
      const data = await response.json();
      if (data.results.length > 0) {
        setUserAddress(data.results[0].formatted_address);
      } else {
        console.error('No results found for reverse geocoding.');
      }
    } catch (error) {
      console.error('Error with reverse geocoding:', error);
    }
  };

  const handlePasswordChange = async () => {
    if (auth.currentUser) {
      try {
        await updatePassword(auth.currentUser, newPassword);
        toast({
          title: 'Password updated.',
          description: 'Your password has been updated successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setNewPassword(''); 
      } catch (error) {
        toast({
          title: 'Error updating password.',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box p={4} bg="lightblue.50" borderRadius="lg" boxShadow="md">
      <Text fontSize="2xl" mb={4} color="blue.700">Dashboard</Text>
      {user && (
        <Box mb={4} p={4} border="1px solid" borderColor="blue.200" borderRadius="md">
          <Text fontSize="lg" color="blue.600">User Info</Text>
          <Text>Email: {user.email}</Text>
          <Text>Password: •••••••• (hidden due to security reasons)</Text>
          <Text>Signed in with Google: {isGoogleUser ? 'Yes' : 'No'}</Text>
        </Box>
      )}
      {!isGoogleUser && (
        <Box mb={4} p={4} border="1px solid" borderColor="blue.200" borderRadius="md">
          <Text fontSize="lg" color="blue.600">Change Password</Text>
          <Stack spacing={3}>
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              focusBorderColor="blue.400"
            />
            <Button onClick={handlePasswordChange} colorScheme="blue">
              Update Password
            </Button>
          </Stack>
        </Box>
      )}
      <Box p={4} border="1px solid" borderColor="blue.200" borderRadius="md">
        <Text fontSize="lg" color="blue.600">Location</Text>
        {locationEnabled ? (
          <Text>
            Location is enabled. Current location (approx.): {userAddress || `${userCoordinates?.lat}, ${userCoordinates?.lng}`}
          </Text>
        ) : (
          <Text>
            Location is not enabled.
          </Text>
        )}
      </Box>
    </Box>
  );
}