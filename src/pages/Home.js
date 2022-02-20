import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserGear } from "@fortawesome/free-solid-svg-icons";
import PostsList from "../components/PostsList";
import CreatePostModal from "../components/CreatePostModal";
import {
  Box,
  Container,
  IconButton,
  useDisclosure,
  Stack,
  Button,
} from "@chakra-ui/react";
import TagsModal from "../components/TagsModal";
import React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { AuthContext } from "../utils/auth";

export default function Home() {
  const [location, setLocation] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onClose: onCloseSettings,
  } = useDisclosure();
  const { auth, user, setUser } = useContext(AuthContext);

  useEffect(() => {
    // Initialize geolocation tracking
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

  const clickSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("Logged out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container maxWidth="90%">
        {user && (
          <>
            <p>Phone number: {user.phoneNumber}</p>
            <Button onClick={clickSignOut}>Sign out</Button>
          </>
        )}
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
      <CreatePostModal location={location} isOpen={isOpen} onClose={onClose} />
      <TagsModal isOpen={isOpenSettings} onClose={onCloseSettings} />{" "}
    </>
  );
}
