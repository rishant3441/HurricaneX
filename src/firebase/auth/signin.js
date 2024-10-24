import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '../config';
import { Box, Button, Input, Stack, Text, useToast } from '@chakra-ui/react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    const { result, error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      toast({
        title: 'Error signing in.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Signed in successfully.',
        description: 'You have been signed in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/dashboard'); // Redirect to dashboard after successful sign-in
    }
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Sign In</Text>
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
        <Button onClick={handleSignIn} isLoading={loading}>
          Sign In
        </Button>
      </Stack>
    </Box>
  );
}