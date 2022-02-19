import { Route } from "wouter";
import "./App.css";
import Testing from "./pages/Testing";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  // eslint-disable-next-line no-unused-vars
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
      <Route path="/home" component={Home} />{" "}
    </ChakraProvider>
  );
}

export default App;
