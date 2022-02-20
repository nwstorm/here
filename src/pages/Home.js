import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserGear } from "@fortawesome/free-solid-svg-icons";
import PostsList from "../components/PostsList";
import CreatePostModal from "../components/CreatePostModal";
import { Box, Container, IconButton, useDisclosure, VStack, Stack, Heading} from "@chakra-ui/react";
import TagsModal from "../components/TagsModal";
import {React} from "react";

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
  <TagsModal isOpen={isOpenSettings} onClose={onCloseSettings} />{" "}]

  {loading? <>
   <VStack loading={loading} spacing={100} align='center'>
    <Heading color="#035B21" fontSize='32px'>Glad you are here!</Heading>
    <Box bg='tomato' h='75%' w='75%' p={10}>Insert animation here</Box>
    <Heading color="#035B21" fontSize='18px'>Collecting Acorns...</Heading>
    </VStack>
  </> : <> 
  <Container maxWidth="90%">
    {location && (
      <Stack direction={["column", "row"]} spacing="24px">
        <p>
          Your location is {location.latitude}, {location.longitude}{" "}
          (accuracy of {location.accuracy})
        </p>
        <IconButton
          isRound
          icon={<FontAwesomeIcon icon={faUserGear} />}
          onClick={onOpenSettings}
        />
      </Stack>
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
  </>}
  </>
    );
}
