import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config';
import { Box, Button, Input, Stack, Text, useToast } from '@chakra-ui/react';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    let result = null;
    let error = null;

    try {
      result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      error = e;
    }

    setLoading(false);

    if (error) {
      toast({
        title: 'Error signing up.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Signed up successfully.',
        description: 'You have been signed up.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/dashboard'); // Redirect to dashboard after successful sign-up
    }
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Sign Up</Text>
      <Stack spacing={3}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignUp} isLoading={loading}>
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
}