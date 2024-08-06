import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            // Initialize Google Auth Provider and Auth
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            // Sign in with popup
            const result = await signInWithPopup(auth, provider);
            
            // Send user info to your server
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                }),
            });

            // Handle server response
            const data = await res.json();
            dispatch(signInSuccess(data)); // Update Redux state
            navigate('/'); // Redirect user
            
            console.log("User info:", result.user); // Log user info (optional)
        } catch (error) {
            console.error("Error during Google sign-in:", error);
            // Optionally handle error (e.g., show a user-friendly message)
        }
    };

    return (
        <button
            onClick={handleGoogleClick}
            type='button'
            className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
        >
            Continue with Google
        </button>
    );
}
