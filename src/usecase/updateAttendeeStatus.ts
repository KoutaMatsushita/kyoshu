import { firestore } from "../firebase";
import { REACTIONS } from "../reactions";
import { Room, User } from "../types";

export const updateAttendeeStatus = (currentUser: User, room: Room, reaction: REACTIONS | null): void => {
  firestore
    .doc(`rooms/${room.id}/attendees/${currentUser.uid}`)
    .set({ displayName: currentUser.displayName, status: reaction }, { merge: true });
};
