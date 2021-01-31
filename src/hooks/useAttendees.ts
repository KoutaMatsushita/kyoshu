import dayjs from "dayjs";
import { AttendeeConverter } from "../converters/AttendeeConverter";
import { firestore } from "../firebase";
import { Attendees, Room } from "../types";
import { useEffect, useState } from "react";

type UseAttendeesResponse = {
  isLoading: boolean;
  attenders: Attendees | undefined;
  error: Error | undefined;
};

export const useAttendees = (room: Room): UseAttendeesResponse => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [attenders, setAttenders] = useState<Attendees>();
  const [error, setError] = useState<Error>();
  useEffect(() => {
    setLoading(true);
    firestore.collection(`rooms/${room.id}/attendees`);
    return firestore.collection(`rooms/${room.id}/attendees`).onSnapshot(
      (doc) => {
        const limit = dayjs().subtract(30, "s");
        const attendees = doc.docs
          .filter((d) => dayjs(d.data().pingAt?.toDate()).isAfter(limit))
          .map((d) => AttendeeConverter.fromFirestore(d, {}));
        setAttenders(attendees);
        setLoading(false);
      },
      (error1) => {
        setError(error1);
        setLoading(false);
      }
    );
  }, [room.id]);
  return {
    isLoading,
    attenders,
    error,
  };
};
