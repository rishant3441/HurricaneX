'use client'

import React from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import { auth, db, firebase_app } from '@/firebase/config';
import addData from '@/firebase/addData';
import { BeatLoader } from 'react-spinners';

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                console.log(await addData(user.uid, "metadata", { lastLogin: user.metadata.lastSignInTime }))
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ?  <BeatLoader cssOverride={style} />: children}
        </AuthContext.Provider>
    );
};