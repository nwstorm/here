import { Grid } from "@chakra-ui/react";
import Compose from "./Compose";
import PostsList from "../components/PostsList";

export default function Home() {
  const compose = Compose();
  const postsList = PostsList();
  return (
    <Grid>
      {compose}
      {postsList}
    </Grid>
  );
}
