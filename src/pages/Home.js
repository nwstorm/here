import { useContext, useEffect, useState } from "react";
import PostsList from "../components/PostsList";
import CreatePostModal from "../components/CreatePostModal";
import {
  Box,
  Container,
  useDisclosure,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import TagsModal from "../components/TagsModal";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../utils/auth";
import Navbar from "../components/Navbar";

export default function Home() {
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onClose: onCloseSettings,
  } = useDisclosure();
  const { auth, setUser } = useContext(AuthContext);

  // Initialize geolocation tracking
  useEffect(() => {
    // Initialize geolocation tracking
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      navigator.geolocation.watchPosition(
        (success) => {
          setLoading(false);
          console.log(
            `Your location is ${success.coords.latitude}, ${success.coords.longitude} (accuracy of ${success.coords.accuracy})`
          );
          setLocation(success.coords);
        },
        (error) => console.log(error)
      );
    }

    // Add listener to see if auth state changes
    onAuthStateChanged(
      auth,
      (user) => {
        console.log("Setting user");
        setUser(user);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  // const clickSignOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       setUser(null);
  //       console.log("Logged out successfully");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <CreatePostModal location={location} isOpen={isOpen} onClose={onClose} />
      <TagsModal isOpen={isOpenSettings} onClose={onCloseSettings} />
      {loading ? (
        <>
          <VStack loading={loading} spacing={100} align="center">
            <Text fontSize="32px" color="#319795">
              Glad ur here!
            </Text>
            <Box bg="tomato" h="75%" w="75%" p={10}>
              Insert animation here
            </Box>
            <Text fontSize="18px" color="#319795">
              Collecting Acorns...
            </Text>
          </VStack>
        </>
      ) : (
        <>
          <Navbar createClick={onOpen} profileClick={onOpenSettings} />
          <Container
            mt="1em"
            padding="0 0.5em"
            bg="lightGreen"
            minHeight="100vh"
          >
            {location && (
              <Box>
                <Heading as="h2" color="darkGreen" ml="10px">
                  Feed
                </Heading>
                <PostsList location={location} />
              </Box>
            )}
          </Container>
        </>
      )}
    </>
  );
}
