'use client'

import { auth } from '@/firebase/config'
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  Center,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FaCloud, FaShieldAlt, FaBullhorn, FaLightbulb } from 'react-icons/fa'

export default function EnhancedLandingPage() {
  const router = useRouter();
  
  return (
    <Box>
      {/* Hero Section */}
      <Container maxW={'7xl'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}>
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.400',
                  zIndex: -1,
                }}>
                Ready now,
              </Text>
              <br />
              <Text as={'span'} color={'blue.400'}>
                be safe later!
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={'xl'}>
              HurricaneX is your ultimate hurricane safety companion. We empower you and your family with essential tools and knowledge to stay safe before, during, and after a hurricane – all completely free!
            </Text>
            <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
              <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                colorScheme={'blue'}
                bg={'blue.400'}
                _hover={{ bg: 'blue.500' }}
                onClick={() => router.push(auth.currentUser ? "/dashboard" : "/sign-up")}>
                Get started
              </Button>
              <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                leftIcon={<PlayIcon h={4} w={4} color={'gray.300'} />}>
                How It Works
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}>
            <Blob
              w={'150%'}
              h={'150%'}
              position={'absolute'}
              top={'-20%'}
              left={0}
              zIndex={-1}
              color={useColorModeValue('blue.50', 'blue.400')}
            />
            <Box
              position={'relative'}
              height={'400px'}
              rounded={'2xl'}
              boxShadow={'2xl'}
              width={'full'}
              overflow={'hidden'}>
              <Image
                alt={'Hero Image'}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={'100%'}
                src={'/hurricane_supply_image.png'}
              />
            </Box>
          </Flex>
        </Stack>
      </Container>

      {/* What HurricaneX Does Section */}
      <Box bg={useColorModeValue('gray.100', 'gray.700')}>
        <Container maxW={'7xl'} py={16}>
          <VStack spacing={8}>
            <Heading
              fontSize={{ base: '3xl', sm: '4xl' }}
              fontWeight={'bold'}
              textAlign={'center'}
              color={'blue.600'}>
              How HurricaneX Empowers You
            </Heading>
            <Text fontSize={'xl'} color={'gray.500'} textAlign={'center'} maxW={'3xl'}>
              HurricaneX is packed with powerful features designed to keep you safe and informed:
            </Text>
            <Wrap spacing={8} justify={'center'}>
              <FeatureCard
                icon={FaCloud}
                title="Real-time Tracking"
                description="Get live updates on hurricane trajectories with our advanced satellite API."
              />
              <FeatureCard
                icon={FaShieldAlt}
                title="Supply Finder"
                description="Locate essential supplies in your area, from food and water to gasoline."
              />
              <FeatureCard
                icon={FaBullhorn}
                title="Emergency Alerts"
                description="Receive timely notifications about approaching hurricanes and critical updates."
              />
              <FeatureCard
                icon={FaLightbulb}
                title="Expert Crisis Tips"
                description="Access comprehensive guides on hurricane preparedness and safety."
              />
            </Wrap>
          </VStack>
        </Container>
      </Box>

      {/* Why We Created HurricaneX Section */}
      <Container maxW={'7xl'} py={16}>
        <Stack spacing={8} align={'center'}>
          <Heading
            fontSize={{ base: '3xl', sm: '4xl' }}
            fontWeight={'bold'}
            textAlign={'center'}
            color={'blue.600'}>
            Born from Tragedy, Built for Safety
          </Heading>
          <Text fontSize={'xl'} color={'gray.500'} textAlign={'center'} maxW={'3xl'}>
            In 2022, Hurricane Milton devastated Tampa, leaving a trail of destruction and heartbreak. This tragedy became our call to action. We created HurricaneX with a singular mission: to ensure that no community would ever be caught unprepared again.
          </Text>
          <Box
            borderWidth={1}
            borderRadius={'lg'}
            p={6}
            width={'full'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            boxShadow={'2xl'}>
            <Text fontSize={'lg'} fontStyle={'italic'} textAlign={'center'}>
              "HurricaneX isn't just an app; it's our commitment to keeping communities safe and informed. We're here to turn the tide on hurricane preparedness."
            </Text>
            <Text mt={2} fontWeight={'bold'} textAlign={'right'}>
              - The HurricaneX Team
            </Text>
          </Box>
        </Stack>
      </Container>

      {/* Completely Free Section */}
      <Box bg={useColorModeValue('blue.50', 'blue.900')}>
        <Container maxW={'5xl'} py={16}>
          <Stack spacing={8} align={'center'}>
            <Heading
              fontSize={{ base: '3xl', sm: '4xl' }}
              fontWeight={'extrabold'}
              textAlign={'center'}
              color={'blue.600'}>
              100% Free, Because Safety Shouldn't Come at a Cost
            </Heading>
            <Text fontSize={'xl'} color={'gray.500'} textAlign={'center'} maxW={'3xl'}>
              At HurricaneX, we believe that everyone deserves access to life-saving information and tools. That's why our entire platform is and always will be completely free to use.
            </Text>
            <HStack spacing={4}>
              <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                colorScheme={'blue'}
                bg={'blue.400'}
                _hover={{ bg: 'blue.500' }}
                onClick={() => router.push(auth.currentUser ? "/dashboard" : "/sign-up")}>
                Sign Up Now
              </Button>
              <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                variant={'outline'}
                colorScheme={'blue'}>
                Learn More
              </Button>
            </HStack>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

const PlayIcon = createIcon({
  displayName: 'PlayIcon',
  viewBox: '0 0 58 58',
  d: 'M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z',
})

const Blob = (props) => {
  return (
    <Icon
      width={'100%'}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 111.298-65.296 59.156-19.391 129.893-34.862 179.715-4.47 54.935 33.707 93.439 104.147 104.066 169.268 10.427 63.931-21.091 121.35-64.767 167.635-45.891 48.462-107.595 69.966-168.937 81.632z"
        fill="currentColor"
      />
    </Icon>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <WrapItem>
      <Center
        w={'300px'}
        h={'300px'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        overflow={'hidden'}
        p={6}>
        <VStack spacing={4} align={'center'}>
          <Icon as={icon} w={10} h={10} color={'blue.400'} />
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {title}
          </Heading>
          <Text color={'gray.500'} align={'center'}>
            {description}
          </Text>
        </VStack>
      </Center>
    </WrapItem>
  );
};