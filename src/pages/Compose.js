import { useState } from 'react'
import { Input, Button, Textarea } from '@chakra-ui/react'
import { addPost } from '../firebase'

export default function Compose({ location }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleClick = () => {
    addPost(title, description, { lat: location.latitude, lon: location.longitude })
    setTitle('')
    setDescription('')
  }

  return (
    <>
      <Input onChange={(e) => setTitle(e.target.value)} placeholder={`Title`}/>
      <Textarea onChange={(e) => setDescription(e.target.value)} placeholder={`What's Happening?`}/>
      <Button onClick={handleClick} colorScheme='teal' float='right'>Post</Button>
    </>
  )
}
