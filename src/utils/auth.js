// import React, { createContext, useContext, useState, useEffect } from "react";
// import firebase from "firebase/app";
import { signInWithPhoneNumber } from "firebase/auth";
// import { getUserStatus, analytics, livesiteDocRef } from "./firebase";
// import { REDIRECT_STATUS, ANALYTICS_EVENTS } from "./Constants";
// import Spinner from "../components/Loading";
// import { useLocation } from "wouter";
// import { app } from "./firebase-config";

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [, setLocation] = useLocation();

//   useEffect(() => {
//     return firebase.auth().onAuthStateChanged(async (currUser) => {
//       if (!currUser) {
//         setLoading(false);
//         analytics.setUserId(null);
//         return;
//       }
//       const { redirect, status } = await getUserStatus(currUser);
//       currUser.status = status;
//       currUser.redirect = redirect;
//       setUser(currUser);
//       setLoading(false);
//       analytics.setUserId(currUser.uid);
//     });
//   });

//   const logout = async () => {
//     analytics.logEvent(ANALYTICS_EVENTS.Logout, { userId: user.uid });
//     await firebase.auth().signOut();
//     setUser(null);
//     setLocation("/");
//   };

//   return loading ? (
//     <Spinner loading />
//   ) : (
//     <AuthContext.Provider value={{ isAuthed: !!user, user, setUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// const handleUser = async (setUser, setLocation) => {
//   const user = firebase.auth().currentUser;
//   const { redirect, status } = await getUserStatus(user);
//   user.status = status;
//   user.redirect = redirect;
//   setUser(user);
//   analytics.setUserId(user.uid);
//   analytics.logEvent(ANALYTICS_EVENTS.Login, { userId: user.uid });
// };

// export const getRedirectUrl = (redirect) => {
//   switch (redirect) {
//     case REDIRECT_STATUS:
//       return "/";
//     default:
//       return "/";
//   }
// };

// // export const handleRedirect = async (redirect, setLocationCallback) => {
// //   const submissionOpen = (await livesiteDocRef.get()).data().submissionsOpen
// //   setLocationCallback(submissionOpen ? '/submission' : getRedirectUrl(redirect))
// // }

// export const googleSignIn = async (setUser, setLocation) => {
//   await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
//   const provider = new firebase.auth.GoogleAuthProvider();
//   try {
//     await firebase.auth().signInWithPopup(provider);
//     await handleUser(setUser, setLocation);
//     return null;
//   } catch (e) {
//     return e;
//   }
// };

export const phoneSignIn = (auth, phoneNumber, appVerifier) => {
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
      console.log("hit here");
    })
    .catch((error) => {
      // Error; SMS not sent
      // ...
    });
};
