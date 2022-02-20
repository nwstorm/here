import { useState } from "react";
import { Route } from "wouter";
import "./App.css";
import Home from "./pages/Home";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { AuthContext } from "./utils/auth";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import Login from "./pages/Login";

// Initialize auth
const auth = getAuth();
setPersistence(auth, browserLocalPersistence)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

const theme = extendTheme({
  colors: {
    lightGreen: "#FBFFF1",
    darkGreen: "#035B21",
    orange: "#FF6D01",
  },
  fonts: {
    heading: "Recoleta, sans-serif",
    body: "HK Grotesk, sans-serif",
  },
});

function App() {
  const [user, setUser] = useState(null);
  const value = { auth, user, setUser };

  return (
    <ChakraProvider theme={theme}>
      <AuthContext.Provider value={value}>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
