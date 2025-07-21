import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signInWithGoogle, signOutUser, setUser } from '@/store/authSlice';
import { setUser as setUserInUserSlice, setTrips } from '@/store/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { handleUserLogin } from '@/lib/userService';
import { getTripsByUserId } from '@/lib/tripServices';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, loading, error, isAuthenticated } = useAppSelector((state) => state.auth);
    const listenerInitialized = useRef(false);

    useEffect(() => {
        // Only set up the listener once
        if (!listenerInitialized.current) {
            listenerInitialized.current = true;

            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                // Only dispatch serializable user data to Redux
                if (user) {
                    const { uid, email, displayName, photoURL, emailVerified } = user;
                    const userData = {
                        uid,
                        email,
                        displayName,
                        photoURL,
                        emailVerified,
                    };

                    // 处理用户登录逻辑（检查/创建数据库记录）
                    try {
                        const dbUserData = await handleUserLogin(userData);
                        dispatch(setUser(userData));
                        dispatch(setUserInUserSlice(dbUserData));
                        const trips = await getTripsByUserId(uid);
                        dispatch(setTrips(trips));
                    } catch (error) {
                        console.error('Error handling user login in auth state change:', error);
                    }

                } else {
                    dispatch(setUser(null));
                    // Clear user data when user signs out
                }
            });

            // Cleanup function
            return () => {
                unsubscribe();
                listenerInitialized.current = false;
            };
        }
    }, [dispatch]);

    const handleSignInWithGoogle = async () => {
        try {
            await dispatch(signInWithGoogle()).unwrap();
        } catch (error) {
            console.error('Sign-in error:', error);
            throw error;
        }
    };

    const handleSignOut = async () => {
        try {
            await dispatch(signOutUser()).unwrap();
        } catch (error) {
            console.error('Sign out error:', error);
            throw error;
        }
    };

    return {
        user,
        loading,
        error,
        signInWithGoogle: handleSignInWithGoogle,
        signOut: handleSignOut,
        isAuthenticated
    };
}; 