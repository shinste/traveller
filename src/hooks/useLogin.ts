import React, { ChangeEvent } from 'react';
import { useState } from "react";
import { doSignInWithEmailAndPassword, doSignInWithGoogle, doCreateUserWithEmailAndPassword } from "../firebase/auth";

const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false);
    // const [isSigningIn, setIsSigningIn] = useState(false);
    // const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(isLogin)
        e.preventDefault();
        setErrorMessage('');
        // Login
        if (isLogin) {
            try {
                const response = await doSignInWithEmailAndPassword(email, password);
                setSuccess(true);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                    if (error.message.includes('auth/invalid-credential')) {
                        setErrorMessage('Invalid Credentials');
                    } else {
                        setErrorMessage(error.message);
                    }
                }
            }
        // Register
        } else {
            if (confirmPassword === password) {
                try {
                    const response = await doCreateUserWithEmailAndPassword(email, password);
                    setSuccess(true);
                } catch (error) {
                    if (error instanceof Error) {
                        console.log(error);
                        if (error.message.includes('auth/email-already-in-use')) {
                            setErrorMessage('Email already in use!')
                        } else if (error.message.includes('auth/invalid-email')) {
                            setErrorMessage('Invalid Email');
                        }
                    }
                }
            } else {
                setErrorMessage('Passwords Dont Match');
                setConfirmPassword('');
            }
        }
    }

    const handleGoogle = async () => {
        setErrorMessage('');
        try {
            await doSignInWithGoogle();
            setSuccess(true);
        } catch (error) {
            console.error(error);
            setErrorMessage('Something Went Wrong!')
        }
        
    }

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    };
    const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

      const handleLoginRegister = () => {
        setIsLogin(!isLogin);
        setErrorMessage('');
        if (confirmPassword) {
            setConfirmPassword('');
        }
      }
    return { handleSubmit, handleGoogle, handleEmail, handlePassword, handleLoginRegister, handleConfirmPassword, success, errorMessage, isLogin}
}

export default useLogin;