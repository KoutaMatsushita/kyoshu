import { firestore } from "../firebase";
import { Room, User } from "../types";

export const leftRoom = (currentUser: User, room: Room): void => {
  firestore.doc(`rooms/${room.id}/attendees/${currentUser.uid}`).delete();
};
