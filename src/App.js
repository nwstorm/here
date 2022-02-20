import { useState } from 'react'
import { Route } from "wouter";
import "./App.css";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContext } from './utils/auth'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'

// Initialize auth
const auth = getAuth()
setPersistence(auth, browserLocalPersistence)
  .then(res => console.log(res))
  .catch(err => console.log(err))

function App() {
  const [user, setUser] = useState(null)
  const value = { auth, user, setUser }

  return (
    <ChakraProvider>
      <AuthContext.Provider value={value}>
        <Route path="/" component={Home} />
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
