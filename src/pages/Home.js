import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import PostsList from "../components/PostsList";
import CreatePostModal from "../components/CreatePostModal";
import LoginModal from "../components/LoginModal";
import {
  Box,
  Button,
  Container,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { AuthContext } from "../utils/auth";

export default function Home() {
  const [location, setLocation] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure()
  const { auth, user, setUser } = useContext(AuthContext)

  // Auth state change listener
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
  });
  
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

  const clickSignOut = () => {
    signOut(auth).then(() => {
      console.log('Sign out successful')
      setUser(null)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Container maxWidth="90%">
        {user ?
          <>
            <Button onClick={clickSignOut}>Logout</Button>
            <p>Phone number: {user.phoneNumber}</p>
          </>
        : 
          <Button onClick={onOpenLogin}>Login</Button>}
        {location && <p>Your location is {location.latitude}, {location.longitude} (accuracy of {location.accuracy})</p>}
        {location &&
          <Box color='black'>
            <PostsList location={location} />
          </Box>
        }
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

      <CreatePostModal
        location={location}
        isOpen={isOpen}
        onClose={onClose}
      />

      <LoginModal
        isOpen={isOpenLogin}
        onClose={onCloseLogin}
      />
    </>
  );
}
