/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PostsList from "../components/PostsList";
import CreatePostModal from "../components/CreatePostModal";
import {
  Box,
  Container,
  Heading,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import TagsModal from "../components/TagsModal";
import React from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [location, setLocation] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onClose: onCloseSettings,
  } = useDisclosure();

  // Initialize geolocation tracking
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
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
      <Navbar createClick={onOpen} profileClick={onOpenSettings} />

      <Container mt="1em" padding="0 0.5em" bg="lightGreen" minHeight="100vh">
        {location && (
          <Box>
            <Heading as="h2" color="darkGreen" ml="10px" >Feed</Heading>
            <PostsList location={location} />
          </Box>
        )}
      </Container>
      <CreatePostModal location={location} isOpen={isOpen} onClose={onClose} />
      <TagsModal isOpen={isOpenSettings} onClose={onCloseSettings} />{" "}
    </>
    
  );
}
