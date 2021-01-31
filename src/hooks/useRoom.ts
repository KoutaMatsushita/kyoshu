import { useEffect, useState } from "react";
import { Room } from "../types";
import { findRoom } from "../usecase/findRoom";

type UseRoomResponse = {
  isLoading: boolean;
  room: Room | undefined;
  error: Error | undefined;
};

export const useRoom = (roomId: string): UseRoomResponse => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [room, setRoom] = useState<Room>();
  const [error, setError] = useState<Error>();
  useEffect(() => {
    setLoading(true);
    findRoom(roomId).then((room) => {
      if (room) {
        setRoom(room);
      } else {
        setError(new Error(`Room ID:${roomId} is not found`));
      }
      setLoading(false);
    });
  }, [roomId]);
  return {
    isLoading,
    room,
    error,
  };
};
