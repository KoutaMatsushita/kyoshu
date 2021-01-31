import firebase from "firebase/app";
import { Room, User } from "../types";
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

export const RoomConverter: FirestoreDataConverter<Room> = {
  toFirestore(modelObject: Room): firebase.firestore.DocumentData {
    return {
      id: modelObject.id,
      ownerId: modelObject.ownerId,
    };
  },
  fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Room {
    return {
      id: snapshot.id,
      ownerId: snapshot.data().ownerId as string,
      isOwner: function (user: User) {
        return user.uid === this.ownerId;
      },
    };
  },
};
