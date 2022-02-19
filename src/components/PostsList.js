import { Box, Center, Stat, StatLabel, StatHelpText } from "@chakra-ui/react";

export default function PostsList(props) {
  const postsList = [
    { title: "abc", body: "123" },
    { title: "def", body: "456" },
  ];

  const listItems = postsList.map((post) => {
    return (
        <Center key={post.title}>
        <Box w='95%' bg="tomato" mt={3}>
        <Stat key={post.title}>
          <StatLabel>{post.title}</StatLabel>
          <StatHelpText>{post.body}</StatHelpText>
        </Stat>
        </Box>
      </Center>
    );
  });

  return listItems;
}
