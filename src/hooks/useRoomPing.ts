import firebase from "firebase/app";
import { useEffect } from "react";
import { firestore } from "../firebase";
import { Room, User } from "../types";

export const useRoomPing = (currentUser: User, room: Room): void => {
  const attendee = firestore.doc(`rooms/${room.id}/attendees/${currentUser.uid}`);
  const ping = () =>
    attendee.update({ displayName: currentUser.displayName, pingAt: firebase.firestore.FieldValue.serverTimestamp() });
  useEffect(() => {
    ping();
    const timeId = setInterval(() => {
      ping();
    }, 5000);
    return () => {
      clearInterval(timeId);
    };
  }, [currentUser.uid, currentUser.displayName, room.id]);
};
