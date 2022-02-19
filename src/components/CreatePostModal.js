import { useState } from 'react'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react'
import { addPost } from '../firebase'

export default function CreatePostModal({ location, isOpen, onClose }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleClick = () => {
    addPost(title, description, { lat: location.latitude, lon: location.longitude })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input onChange={(e) => setTitle(e.target.value)} placeholder={`Title`}/>
          <Textarea mt="8px" onChange={(e) => setDescription(e.target.value)} placeholder={`What's Happening?`}/>
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
