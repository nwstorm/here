import { Route } from "wouter";
import "./App.css";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { getPosts } from "./firebase";

function App() {
  useEffect(() => {
    getPosts(data => console.log(data));
  }, []);
  
  return (
    <ChakraProvider>
      <Route path="/" component={Home} />
    </ChakraProvider>
  );
}

export default App;
