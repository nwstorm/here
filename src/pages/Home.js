import { Grid, GridItem } from "@chakra-ui/react";
import Compose from "./Compose";
import PostsList from "../components/PostsList";
import { Box } from '@chakra-ui/react'


export default function Home() {
  const compose = Compose();
  const postsList = PostsList();
  return (
    <>
    <Grid>
      {compose}
    </Grid>
    <Box color='black'>
      {postsList}
    </Box>
    </>
  );
}
