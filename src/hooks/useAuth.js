import React, { useState, useEffect, useContext, createContext } from 'react';
import 'firebase/auth';
import firebase from 'firebase/app';
import { useRouter } from 'next/router';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const signin = async (credentials) => {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password);
    setUser(response.user);
    return response.user;
  };

  const signup = async (credentials) => {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password);
    setUser(response.user);
    return response.user;
  };

  const signout = async (redirectUrl) => {
    await firebase.auth().signOut();
    router.push(redirectUrl);
    setUser(false);
  };

  const sendPasswordResetEmail = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email);
    return true;
  };

  const confirmPasswordReset = async (code, password) => {
    await firebase.auth().confirmPasswordReset(code, password);
    return true;
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
