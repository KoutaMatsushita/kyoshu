import { RoomConverter } from "../converters/RoomConverter";
import { firestore } from "../firebase";
import { Room } from "../types";

export const findRoom = async (roomId: string): Promise<Room | null> => {
  const doc = await firestore.collection("rooms").doc(roomId).withConverter(RoomConverter).get();
  return doc.data() ?? null;
};
