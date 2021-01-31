import firebase from "firebase/app";
import { firestore } from "../firebase";
import { Room, User } from "../types";

export const joinRoom = (currentUser: User, room: Room): void => {
  firestore
    .doc(`rooms/${room.id}/attendees/${currentUser.uid}`)
    .set(
      { displayName: currentUser.displayName, status: null, pingAt: firebase.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    );
};
