import { useState } from "react";
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
  Select,
  Textarea,
} from "@chakra-ui/react";
import { addPost } from "../firebase";

export default function CreatePostModal({ location, isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const handleClick = () => {
    addPost(title, description, time, {
      lat: location.latitude,
      lon: location.longitude,
    });
    onClose();
  };

  const handleTime = (e) => {
    var timeOut = new Date();
    timeOut.setSeconds(timeOut.getSeconds() + e.target.value * 60 * 60);
    setTime(timeOut.getTime());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`Title`}
          />
          <Textarea
            mt="8px"
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`What's Happening?`}
          />
          <Select placeholder="Select time" onChange={(e) => handleTime(e)}>
            <option value={1}>1 Hour</option>
            <option value={4}>4 Hours</option>
            <option value={12}>12 Hours</option>
            <option value={24}>1 Day</option>
            <option value={168}>1 Week</option>
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr="16px" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleClick}>
            Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
