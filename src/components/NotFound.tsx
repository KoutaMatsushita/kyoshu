import { Button, Container, Text } from "@chakra-ui/react";
import { Link } from "wouter";

export const NotFound: React.FC = () => (
  <Container>
    <Text fontSize="2xl" mt={4}>
      ページが見つかりませんでした😢
    </Text>
    <Link href="/">
      <Button>戻る</Button>
    </Link>
  </Container>
);
