import { useState } from 'react'
import { Route } from "wouter";
import "./App.css";
import Home from "./pages/Home";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { AuthContext } from "./utils/auth";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"

// Initialize auth
const auth = getAuth()
setPersistence(auth, browserLocalPersistence)
  .then(res => console.log(res))
  .catch(err => console.log(err))

const theme = extendTheme({
  colors: {
    lightGreen: '#FBFFF1',
    darkGreen: '#035B21',
    carrot: '#FF6D1B',
  },
  fonts: {
    heading: 'HK Grotesk, sans-serif',
    body: 'HK Grotesk, sans-serif',
  },
  shadows: {
    lg: "0 10px 15px -3px rgba(3, 91, 33, 0.1), 0 4px 6px -2px rgba(3, 91, 33, 0.05)",
  }
})

function App() {
  const [user, setUser] = useState(null)
  const value = { auth, user, setUser }

  return (
    <ChakraProvider theme={theme}>
      <AuthContext.Provider value={value}>
        <Route path="/" component={Home} />
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
