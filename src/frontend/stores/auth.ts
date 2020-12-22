import firebase from "firebase/app";
import { writable } from "svelte/store";

interface AuthState {
  status: "loading" | "in" | "out";
  user?: firebase.User;
  token?: string;
}

const createAuthState = (value: AuthState) => {
  let store = writable<AuthState>(value);
  function set(newValue) {
    return store.set((value = newValue));
  }
  function update(fn) {
    store.update((oldValue) => (value = fn(oldValue)));
  }
  function get() {
    return value;
  }

  return {
    set,
    update,
    subscribe: store.subscribe,
    get,
  };
};

export const authState = createAuthState({
  status: "loading",
});
