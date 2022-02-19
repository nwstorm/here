import { useEffect, useState } from "react";
import { Box, Center, Stat, StatLabel, StatHelpText } from "@chakra-ui/react";
import { getPosts } from '../firebase'
import { getDistance } from "../utils/geoLocation";

export default function PostsList({ location }) {
  const [posts, setPosts] = useState([]);

  // Fetch and subscribe to posts
  useEffect(() => {
    getPosts(data => setPosts(data));
  }, []);

  const distance = (postCoords) => {
    return getDistance(
      {lat: postCoords.lat, lon: postCoords.lon},
      {lat: location.latitude, lon: location.longitude}
    )
  }

  const listItems = posts.filter(post => distance(post.coords) < 100).map((post) => {
    return (
      <Center key={post.title}>
        <Box w='95%' bg="tomato" mt={3}>
        <Stat key={post.title}>
          <StatLabel>{post.title}</StatLabel>
          <StatHelpText>{post.body}</StatHelpText>
          <StatHelpText>{post.coords.lat}, {post.coords.lon}</StatHelpText>
          <StatHelpText>Distance: {distance(post.coords)}</StatHelpText>
        </Stat>
        </Box>
      </Center>
    );
  });

  return listItems;
}
