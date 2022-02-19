import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import PostsList from "../components/PostsList";
import CreatePostModal from "../components/CreatePostModal";
import {
  Box,
  Container,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const auth = getAuth()
setPersistence(auth, browserLocalPersistence)
  .then(res => console.log(res))
  .catch(err => console.log(err))

function SignUp() {
  const [recaptcha, setRecaptcha] = useState(null);
  const element = useRef(null);

  useEffect(() => {
    if (!recaptcha) {
      const verifier = new RecaptchaVerifier(element.current, {
        size: 'invisible',
      }, auth)

      verifier.verify().then(() => setRecaptcha(verifier));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {recaptcha && <PhoneNumberVerification recaptcha={recaptcha} />}
      <div ref={element}></div>
    </>
  );
}

function PhoneNumberVerification({ recaptcha }) {
  const [phone, setPhone] = useState('')
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [code, setCode] = useState('')

  const phoneNumber = `+1${phone}`;

  const signIn = async () => {
    setConfirmationResult(await signInWithPhoneNumber(auth, phoneNumber, recaptcha));
  };

  const verifyCode = async () => {
    try {
      const result = await confirmationResult.confirm(code);
      console.log(result.user);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      <input value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={signIn}>Sign In</button>

      {confirmationResult && (
        <div>
          <label>Verify code</label>
          <br />
          <input value={code} onChange={(e) => setCode(e.target.value)} />

          <button onClick={verifyCode}>Verify Code</button>
        </div>
      )}
    </>
  )
}

export default function Home() {
  const [location, setLocation] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  
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
    <>
      <SignUp />
      <Container maxWidth="90%">
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
    </>
  );
}
