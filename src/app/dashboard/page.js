'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/firebase/config';
import { updatePassword } from 'firebase/auth';
import { Box, Button, Input, Stack, Text, useToast } from '@chakra-ui/react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [userCoordinates, setUserCoordinates] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationEnabled(true);
        },
        (error) => {
          console.error('Error getting user location:', error);
          setLocationEnabled(false);
        }
      );
    }

    return () => unsubscribe();
  }, []);

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
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Dashboard</Text>
      {user && (
        <Box mb={4}>
          <Text fontSize="lg">User Info</Text>
          <Text>Email: {user.email}</Text>
          <Text>
            Password: {showPassword ? '********' : '••••••••'}
            <Button ml={2} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </Text>
        </Box>
      )}
      <Box mb={4}>
        <Text fontSize="lg">Change Password</Text>
        <Stack spacing={3}>
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button onClick={handlePasswordChange}>Update Password</Button>
        </Stack>
      </Box>
      <Box>
        <Text fontSize="lg">Location</Text>
        {locationEnabled ? (
          <Text>
            Location is enabled. Current location: {userCoordinates.lat}, {userCoordinates.lng}
          </Text>
        ) : (
          <Text>Location is not enabled.</Text>
        )}
      </Box>
    </Box>
  );
}