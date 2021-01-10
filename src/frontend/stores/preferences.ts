import { writable } from "svelte/store";

interface Preference {
  dividend: {
    tableItemsPerPage: number;
  };
}
const key = "baedangmoa:preferences";
const storedPrefs = JSON.parse(
  localStorage.getItem(key) ||
    JSON.stringify({
      dividend: {
        tableItemsPerPage: 10,
      },
    })
);
const preferences = writable<Preference>(storedPrefs);
preferences.subscribe((value) => {
  localStorage.setItem(key, JSON.stringify(value));
});

export default preferences;
