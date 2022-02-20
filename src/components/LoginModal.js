import React from 'react';
import { useEffect, useState, useRef, useContext } from 'react'
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  // Spacer,
  Flex,
} from '@chakra-ui/react'
import { AuthContext } from '../utils/auth';

function SignUp() {
  const [recaptcha, setRecaptcha] = useState(null);
  const element = useRef(null);
  const { auth } = useContext(AuthContext)

  useEffect(() => {
    if (!recaptcha) {
      const verifier = new RecaptchaVerifier(element.current, {
        size: 'invisible',
      }, auth)

      verifier.verify().then(() => setRecaptcha(verifier));
    }
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
  const { auth, setUser } = useContext(AuthContext)

  const phoneNumber = `+1${phone}`;

  const signIn = async () => {
    setConfirmationResult(await signInWithPhoneNumber(auth, phoneNumber, recaptcha));
  };

  const verifyCode = async () => {
    confirmationResult.confirm(code)
      .then(result => setUser(result.user))
      .catch(error => console.log(error))
  };

  return (
    <>
      <Flex>
      <Input placeholder="(555) 555-5555" value={phone} onChange={(e) => setPhone(e.target.value)} />
      {/* <Spacer /> */}
      <Button onClick={signIn}>Sign In</Button>
      </Flex>

      {confirmationResult && (
        <div>
          <label>Verify code</label>
          <Input value={code} onChange={(e) => setCode(e.target.value)} />
          <Button onClick={verifyCode}>Verify Code</Button>
        </div>
      )}
    </>
  )
}

export default function LoginModal({ isOpen, onClose }) {
  const handleClick = () => {
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SignUp />
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' mr="16px" onClick={onClose}>Cancel</Button>
          <Button colorScheme='blue' onClick={handleClick}>
            Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
