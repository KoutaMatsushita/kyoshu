import { Box, Button, Container, Divider, Flex, VStack } from "@chakra-ui/react";
import { useAtom } from "jotai";

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { userNameAtom } from "../atoms";
import { useRoomPing } from "../hooks/useRoomPing";
import { Attendees as AttendeesType, Room, User } from "../types";
import { joinRoom } from "../usecase/joinRoom";
import { leftRoom } from "../usecase/leftRoom";
import { updateAttendeeStatus } from "../usecase/updateAttendeeStatus";
import { Attendees } from "./Attendee";
import { EditNameModal } from "./EditNameModal";
import { RoomMenu } from "./RoomMenu";

export const JoinedRoom: React.FC<{ currentUser: User; room: Room; attendees: AttendeesType }> = ({
  currentUser,
  room,
  attendees,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [, updateUserName] = useAtom(userNameAtom);
  const [, setLocation] = useLocation();
  useEffect(() => {
    joinRoom(currentUser, room);
  }, [currentUser.uid, room.id]);
  useRoomPing(currentUser, room);

  const onClose = () => setOpen(false);

  const onRaisedHand = () => {
    updateAttendeeStatus(currentUser, room, "✋");
  };

  const onReset = () => {
    updateAttendeeStatus(currentUser, room, null);
  };

  const onExit = () => {
    leftRoom(currentUser, room);
    setLocation("/");
  };

  const onEditName = () => setOpen(true);
  const onSave = (newName: string) => {
    updateUserName(newName);
    setOpen(false);
  };

  return (
    <Container h="100%">
      <Flex direction="column" h="100%" divider={<Divider />}>
        <RoomMenu currentUser={currentUser} room={room} onExit={onExit} onEditName={onEditName} />
        <Divider />
        <Box flexGrow={1} style={{ overflow: "auto" }}>
          <Attendees attendees={attendees} />
        </Box>
        <Divider />
        <Button onMouseUp={onReset} onMouseDown={onRaisedHand} m={4} p={8}>
          ✋ 挙手
        </Button>
      </Flex>
      <EditNameModal currentUser={currentUser} isOpen={isOpen} onClose={onClose} onSave={onSave} />
    </Container>
  );
};
