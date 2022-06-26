import { AtomEffect } from "recoil";

type WithExpiry<T> = T & { __expiry: number | undefined };

const StorageEffect =
  (storage?: Storage) =>
  <T>(key: string, expiry?: number): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = storage?.getItem(key);
    if (savedValue) {
      const value = JSON.parse(savedValue) as WithExpiry<T>;
      const expiry = value?.__expiry;
      const now = Math.floor(Date.now() / 1000);
      setSelf((defaultValue) => (expiry && now >= expiry ? defaultValue : value));
    }

    onSet((newValue, _, isReset) => {
      const now = Math.floor(Date.now() / 1000);
      const value = { ...newValue, __expiry: expiry ? now + expiry : undefined };
      isReset ? storage?.removeItem(key) : storage?.setItem(key, JSON.stringify(value));
    });
  };

const getSessionStorage = () => (typeof sessionStorage === "undefined" ? undefined : sessionStorage);
const getLocalStorage = () => (typeof localStorage === "undefined" ? undefined : localStorage);

export const SessionStorageEffect = StorageEffect(getSessionStorage());
export const LocalStorageEffect = StorageEffect(getLocalStorage());
