import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

export default function PostsList(props) {
  const postsList = [
    { title: "abc", body: "123" },
    { title: "def", body: "456" },
  ];

  const listItems = postsList.map((post) => {
    return (
      <Stat>
        <StatLabel>{post.title}</StatLabel>
        <StatHelpText>{post.body}</StatHelpText>
      </Stat>
    );
  });

  return listItems;
}
