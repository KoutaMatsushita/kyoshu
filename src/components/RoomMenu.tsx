import { ArrowBackIcon, EditIcon, CopyIcon } from "@chakra-ui/icons";
import { Button, HStack, Spacer, useClipboard, useToast } from "@chakra-ui/react";
import { Room, User } from "../types";

export const RoomMenu: React.FC<{ currentUser: User; room: Room; onExit: () => void; onEditName: () => void }> = ({
  onExit,
  onEditName,
}) => {
  const { onCopy } = useClipboard(window.location.href);
  const toast = useToast();
  const _onCopy = () => {
    onCopy();
    toast({
      title: "コピー完了",
      status: "success",
      position: "top",
      duration: 5000,
      isClosable: true,
    });
  };
  return (
    <HStack p={4} h="72px" w="100%" justifyContent="start">
      <Button aria-label="退室" leftIcon={<ArrowBackIcon />} onClick={onExit}>
        退室
      </Button>
      <Spacer />
      <Button aria-label="URL コピー" leftIcon={<CopyIcon />} onClick={_onCopy}>
        URL コピー
      </Button>
      <Button aria-label="表示名変更" leftIcon={<EditIcon />} onClick={onEditName}>
        表示名変更
      </Button>
    </HStack>
  );
};
