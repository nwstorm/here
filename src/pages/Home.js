import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PostsList from "../components/PostsList";
import CreatePostModal from "../components/CreatePostModal";
import { Box, Container, IconButton, useDisclosure, Text, VStack} from "@chakra-ui/react";
import React from "react";

export default function Home() {
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Initialize geolocation tracking
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      setLoading()
      navigator.geolocation.watchPosition(
        (success) => {
          console.log(
            `Your location is ${success.coords.latitude}, ${success.coords.longitude} (accuracy of ${success.coords.accuracy})`
          );
          setLocation(success.coords);
        },
        (error) => console.log(error)
      );
    }
  }, []);

  return (
    <>
      <Container maxWidth="90%">
        {location && (
          <p>
            Your location is {location.latitude}, {location.longitude} (accuracy
            of {location.accuracy})
          </p>
        )}
        {location && (
          <Box color="black">
            <PostsList location={location} />
          </Box>
        )}
      </Container>

      <IconButton
        isRound
        size="lg"
        pos="fixed"
        right="2em"
        bottom="2em"
        icon={<FontAwesomeIcon icon={faPlus} />}
        onClick={onOpen}
      />

      <CreatePostModal location={location} isOpen={isOpen} onClose={onClose} />

      <VStack loading={loading} spacing={100} align='center'>
        <Text fontSize='32px' color="#319795">Glad ur here!</Text>
        <Box bg='tomato' h='75%' w='75%' p={10}>Insert animation here</Box>
        <Text fontSize='18px' color="#319795" >Collecting Acorns...</Text>
      </VStack>
    </>
  );
}
