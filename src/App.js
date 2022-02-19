import { Route } from "wouter";
import "./App.css";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/Login";

function App() {
  return (
    <ChakraProvider>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
    </ChakraProvider>
  );
}

export default App;
