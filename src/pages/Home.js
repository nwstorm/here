import { Grid } from "@chakra-ui/react";
import PostsList from "../components/PostsList";

export default function Home() {
  const postsList = PostsList();
  return <Grid>{postsList}</Grid>;
}
