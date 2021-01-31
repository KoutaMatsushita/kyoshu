import firebase from "firebase/app";
import { Attendee } from "../types";
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

export const AttendeeConverter: FirestoreDataConverter<Attendee> = {
  toFirestore(modelObject: Attendee): firebase.firestore.DocumentData {
    return {
      id: modelObject.id,
      status: modelObject.status,
      displayName: modelObject.displayName,
      pingAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Attendee {
    return {
      id: snapshot.id,
      status: snapshot.data().status as string | null,
      displayName: snapshot.data().displayName as string,
      pingAt: snapshot.data().pingAt.toDate(),
    };
  },
};
