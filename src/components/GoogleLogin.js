import { GoogleLoginButton } from 'react-social-login-buttons'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
const provider = new GoogleAuthProvider()

export const LoginButton = () => {
    return (
        <GoogleLoginButton
            onClick={() => {
                signInWithPopup(getAuth(), provider)
            }}
        />
    )
}