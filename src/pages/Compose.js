import { useState } from 'react'
import { Input, Button, Textarea } from '@chakra-ui/react'

export default function Compose() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleClick = () => {
    console.log({ title, description })
  }

  return (
    <>
      <Input onChange={(e) => setTitle(e.target.value)} placeholder={`Title`}/>
      <Textarea onChange={(e) => setDescription(e.target.value)} placeholder={`What's Happening?`}/>
      <Button onClick={handleClick} colorScheme='teal' float='right'>Post</Button>
    </>
  )
}
