import { RoomConverter } from "../converters/RoomConverter";
import { firestore } from "../firebase";
import { Room, User } from "../types";
import { joinRoom } from "./joinRoom";

export const createRoom = async (currentUser: User): Promise<Room> => {
  const room = await (await firestore.collection("rooms").add({ ownerId: currentUser.uid }))
    .withConverter(RoomConverter)
    .get()
    .then(async (d) => await d.data());
  if (!room) {
    throw Error("notfound room");
  }
  await joinRoom(currentUser, room);
  return room;
};
