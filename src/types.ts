export type User = {
  uid: string;
  displayName: string;
};
export type Room = {
  id: string;
  ownerId: string;
  isOwner(user: User): boolean;
};
export type Attendee = {
  id: string;
  status: string | null;
  displayName: string;
  pingAt: Date;
};
export type Attendees = Attendee[];
