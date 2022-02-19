import { useEffect, useState } from "react";
import { Grid } from "@chakra-ui/react";
import Compose from "./Compose";
import PostsList from "../components/PostsList";
import { Box, Container } from '@chakra-ui/react'


export default function Home() {
  const [location, setLocation] = useState([]);
  
  // Initialize geolocation tracking
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      navigator.geolocation.watchPosition(
        (success) => {
          console.log(`Your location is ${success.coords.latitude}, ${success.coords.longitude} (accuracy of ${success.coords.accuracy})`)
          setLocation(success.coords)
        },
        (error) => console.log(error)
      );
    }
  }, [])

  return (
    <Container maxWidth="90%">
      {location && <p>Your location is {location.latitude}, {location.longitude} (accuracy of {location.accuracy})</p>}
      <Grid>
        <Compose location={location} />
      </Grid>
      {location &&
        <Box color='black'>
          <PostsList location={location} />
        </Box>
      }
    </Container>
  );
}
