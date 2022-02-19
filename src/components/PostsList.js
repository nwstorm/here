import { Stat, StatLabel, StatHelpText } from "@chakra-ui/react";

export default function PostsList(props) {
  const postsList = [
    { title: "abc", body: "123" },
    { title: "def", body: "456" },
  ];

  const listItems = postsList.map((post) => {
    return (
      <Stat key={post.title}>
        <StatLabel>{post.title}</StatLabel>
        <StatHelpText>{post.body}</StatHelpText>
      </Stat>
    );
  });

  return listItems;
}
