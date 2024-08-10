import { GoogleLoginButton } from 'react-social-login-buttons'
import { GoogleAuthProvider, getAuth, signInWithCredential, signInWithPopup } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { useGoogleLogin } from '@react-oauth/google'

export const LoginButton = () => {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            const idToken = tokenResponse.access_token
            console.log(idToken)
            const credential = GoogleAuthProvider.credential(null, idToken);

            signInWithCredential(auth, credential).catch((error) => {
                console.error("ERROR: signInWithCredential failed: [" + error.code + "]: " + error.message)
            })
            
        },
        onError: () => {
            console.warn("WARNING: Google log in failed")
        }
    });
    
    return (
        <GoogleLoginButton 
        onClick={() => {
            login()
            
        }}
        />
        )
    }