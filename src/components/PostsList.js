import { useEffect, useState } from "react";
import { Box, Center, Stat, StatLabel, StatHelpText } from "@chakra-ui/react";
import { getPosts } from '../firebase'
import { isWithinCoord } from "../utils/geoLocation";

export default function PostsList({ location }) {
  const [posts, setPosts] = useState([]);

  // Fetch and subscribe to posts
  useEffect(() => {
    getPosts(data => setPosts(data));
  }, []);

  const isWithin = (postCoords) => {
    return isWithinCoord(
      {lat: postCoords.lat, lon: postCoords.lon},
      {lat: location.latitude, lon: location.longitude}
    )
  }

  const listItems = posts.filter(post => isWithin(post.coords)).map((post) => {
    return (
      <Center key={post.title}>
        <Box w='95%' bg="tomato" mt={3}>
        <Stat key={post.title}>
          <StatLabel>{post.title}</StatLabel>
          <StatHelpText>{post.body}</StatHelpText>
          <StatHelpText>{post.coords.lat}, {post.coords.lon}</StatHelpText>
        </Stat>
        </Box>
      </Center>
    );
  });

  return listItems;
}
