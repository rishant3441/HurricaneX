'use client'

import { AuthContextProvider } from "@/context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { APIProvider } from '@vis.gl/react-google-maps'

import { ApolloProvider } from "@apollo/client"
import client from "@/context/apollo-client"

function Providers({children})
{
    return ( 
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
    <AuthContextProvider>
    <ApolloProvider client={client}>
    <ChakraProvider>{children}</ChakraProvider>
    </ApolloProvider>
    </AuthContextProvider>
    </APIProvider>
    </GoogleOAuthProvider>
    )
}

export default Providers;