/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PostsList from "../components/PostsList";
import CreatePostModal from "../components/CreatePostModal";
import {
  Box,
  Container,
  Heading,
  useDisclosure,
  VStack,
  Text,
} from "@chakra-ui/react";
import TagsModal from "../components/TagsModal";
import React from "react";
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

  // const [loadingscreen] =
  

  // const [mainscreen] = 
  // <> 
  // <Container maxWidth="90%">
  //   {location && (
  //     <Stack direction={["column", "row"]} spacing="24px">
  //       <p>
  //         Your location is {location.latitude}, {location.longitude}{" "}
  //         (accuracy of {location.accuracy})
  //       </p>
  //       <IconButton
  //         isRound
  //         icon={<FontAwesomeIcon icon={faUserGear} />}
  //         onClick={onOpenSettings}
  //       />
  //     </Stack>
  //   )}
  //   {location && (
  //     <Box color="black">
  //       <PostsList location={location} />
  //     </Box>
  //   )}
  // </Container>
  // <IconButton
  //   isRound
  //   size="lg"
  //   pos="fixed"
  //   right="2em"
  //   bottom="2em"
  //   icon={<FontAwesomeIcon icon={faPlus} />}
  //   onClick={onOpen}
  // />
  // </>

  // Initialize geolocation tracking
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
        navigator.geolocation.watchPosition(
        (success) => {
          setLoading(false)
          console.log(
            `Your location is ${success.coords.latitude}, ${success.coords.longitude} (accuracy of ${success.coords.accuracy})`
          );
          setLocation(success.coords);
        },
        (error) => console.log(error)
      );
    }
  }, []);

return ( <>
  <CreatePostModal location={location} isOpen={isOpen} onClose={onClose} />
  <TagsModal isOpen={isOpenSettings} onClose={onCloseSettings} />

  {loading? <>
   <VStack loading={loading} spacing={100} align='center'>
    <Text fontSize='32px' color="#319795">Glad ur here!</Text>
    <Box bg='tomato' h='75%' w='75%' p={10}>Insert animation here</Box>
    <Text fontSize='18px' color="#319795" >Collecting Acorns...</Text>
    </VStack>
  </> : <>
  <Navbar createClick={onOpen} profileClick={onOpenSettings} />
  <Container mt="1em" padding="0 0.5em" bg="lightGreen" minHeight="100vh">
    {location && (
      <Box>
        <Heading as="h2" color="darkGreen" ml="10px" >Feed</Heading>
        <PostsList location={location} />
      </Box>
    )}
  </Container>
  </>}
  </>
);
}
