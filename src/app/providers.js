'use client'

import { ChakraProvider } from "@chakra-ui/react"
import {APIProvider} from '@vis.gl/react-google-maps';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthContextProvider } from "@/context/AuthContext";

function Providers({children})
{
    return ( 
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
    <AuthContextProvider>
    <ChakraProvider>{children}</ChakraProvider>
    </AuthContextProvider>
    </APIProvider>
    </GoogleOAuthProvider>
    )
}

export default Providers;