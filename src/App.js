import { Route } from "wouter";
import "./App.css";
import Home from "./pages/Home";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";

const theme = extendTheme({
  fonts: {
    heading: 'HK Grotesk, sans-serif',
    body: 'HK Grotesk, sans-serif',
  },
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Route path="/" component={Home} />
    </ChakraProvider>
  );
}

export default App;
