import { Route } from "wouter";
import logo from "./logo.svg";
import "./App.css";
import Testing from "./pages/Testing";
import Compose from "./pages/Compose";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      navigator.geolocation.watchPosition(
        (success) => console.log(success),
        (error) => console.log(error)
      );
    }
  };
  return (
    <ChakraProvider>
      <Route path="/testing" component={Testing} />
      <Route path="/waho" component={Testing} />
      <Route path="/home" component={Home} />
      <Route path="/compose" component={Compose} />
    </ChakraProvider>
  );
}

export default App;
