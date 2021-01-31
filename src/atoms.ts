import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";
import { User } from "./types";
import { login } from "./usecase/login";

const wait = (duration: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, duration);
  });

const USER_NAME_KEY = "USER_NAME";
export const userNameAtom = atomWithReducer(localStorage.getItem(USER_NAME_KEY), (_prev, newName: string) => {
  localStorage.setItem(USER_NAME_KEY, newName);
  return newName;
});
export const asyncUserAtom = atom<User>(async (get) => {
  const displayName = get(userNameAtom);
  const user = await login();
  return {
    uid: user.uid,
    displayName: displayName || user.uid,
  };
});
