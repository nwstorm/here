import { Route } from "wouter";
import "./App.css";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Route path="/" component={Home} />
    </ChakraProvider>
  );
}

export default App;
