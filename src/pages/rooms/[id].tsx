import { useAtomValue } from "jotai/utils";
import { asyncUserAtom } from "../../atoms";
import { JoinedRoom } from "../../components/JoinedRoom";
import { Loading } from "../../components/Loading";
import { NotFound } from "../../components/NotFound";
import { useAttendees } from "../../hooks/useAttendees";
import { useRoom } from "../../hooks/useRoom";
import { Room, User } from "../../types";

const Room: React.FC<{ currentUser: User; room: Room }> = ({ currentUser, room }) => {
  const { isLoading, attenders, error } = useAttendees(room);
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <NotFound />;
  }
  if (attenders) {
    return <JoinedRoom currentUser={currentUser} room={room} attendees={attenders} />;
  } else {
    return <NotFound />;
  }
};

const RoomPage: React.FC<{ roomId: string }> = ({ roomId }) => {
  const currentUser = useAtomValue(asyncUserAtom);
  const { isLoading, room, error } = useRoom(roomId);
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <NotFound />;
  }
  if (room) {
    return <Room currentUser={currentUser} room={room} />;
  } else {
    return <NotFound />;
  }
};

export default RoomPage;
