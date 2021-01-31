import { Box, Button, Container, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { useAtomValue } from "jotai/utils";
import { useState } from "react";
import { useLocation } from "wouter";
import { asyncUserAtom } from "../atoms";
import { createRoom } from "../usecase/createRoom";

const IndexPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [creating, setCreating] = useState(false);
  const user = useAtomValue(asyncUserAtom);
  const onCreateRoom = async () => {
    setCreating(true);
    const room = await createRoom(user);
    setLocation(`/rooms/${room.id}`);
    setCreating(false);
  };
  return (
    <Container p={4}>
      <Box>
        <Heading>kyoshu</Heading>
        <Button isLoading={creating} mt={4} onClick={onCreateRoom}>
          ルーム作成
        </Button>
      </Box>
      <Box pt={4}>
        <Heading>使い方</Heading>
        <Box p={4}>
          <Heading size="md">主催側</Heading>
          <Text>「ルーム作成」ボタンを押下後、 URL を参加側に通知する</Text>
        </Box>
        <Box p={4}>
          <Heading size="md">参加側</Heading>
          <Text>主催者により共有された URL をブラウザで開く</Text>
        </Box>
      </Box>
      <Box pt={4}>
        <Heading size="lg">注意事項</Heading>
        <UnorderedList>
          <ListItem>初期状態では表示名は適当な文字列なので、画面右上より適宜変更して下さい。</ListItem>
          <ListItem>約30秒応答がないユーザは自動的に非表示になります。</ListItem>
        </UnorderedList>
      </Box>
    </Container>
  );
};

export default IndexPage;
