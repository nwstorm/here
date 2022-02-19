import { useState } from 'react'
import { Input, Button, Textarea } from '@chakra-ui/react'
import { addPost } from '../firebase'

export default function Compose() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleClick = () => {
    // Explicitly fetch location so that it's as accurate as possible
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      navigator.geolocation.getCurrentPosition(
        (success) => {
          console.log(`Your location is ${success.coords.latitude}, ${success.coords.longitude} (accuracy of ${success.coords.accuracy})`)
          addPost(title, description, { lat: success.coords.latitude, lon: success.coords.longitude })
        },
        (error) => console.log(error),
      );
    }
  }

  return (
    <>
      <Input onChange={(e) => setTitle(e.target.value)} placeholder={`Title`}/>
      <Textarea onChange={(e) => setDescription(e.target.value)} placeholder={`What's Happening?`}/>
      <Button onClick={handleClick} colorScheme='teal' float='right'>Post</Button>
    </>
  )
}
