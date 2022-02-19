import { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getPosts } from "../firebase";
import { getDistance } from "../utils/geoLocation";

export default function PostsList({ location }) {
  const [posts, setPosts] = useState([]);

  // Fetch and subscribe to posts
  useEffect(() => {
    getPosts((data) => {
      data.sort((a, b) => {
        return a.time > b.time;
      });
      setPosts(data);
    });
  }, []);

  const distance = (postCoords) => {
    return getDistance(
      { lat: postCoords.lat, lon: postCoords.lon },
      { lat: location.latitude, lon: location.longitude }
    ).toFixed(2);
  };

  const listItems = posts
    .filter((post) => distance(post.coords) < 100)
    .sort((a, b) => {
      return distance(a.coords) - distance(b.coords);
    })
    .map((post) => {
      return (
        <Box p="6" borderWidth="1px" key={post.id} mt={4}>
          <Heading>{post.title}</Heading>
          <p>{post.body}</p>
          <p>
            {post.coords.lat}, {post.coords.lon}
          </p>
          <p>
            <FontAwesomeIcon icon={faLocationDot} />　{distance(post.coords)}m
          </p>
        </Box>
      );
    });
  return listItems;
}
