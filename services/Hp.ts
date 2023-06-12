import { Time } from "./types/menu.type";

const Hp = {
  convert_day_to_num: (available_time: number) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const day = daysOfWeek.find((_, index) => index === available_time);
    if (day) {
      return day;
    } else {
      return "Invalid number. Please provide a number from 0 to 6.";
    }
  },
  renderClock: (from: Time, to: Time) => {
    const pad = (num: number) => (num < 10 ? `0${num}` : num);

    const fromStr = `${pad(from.hr)}:${pad(from.min)}`;
    const toStr = `${pad(to.hr)}:${pad(to.min)}`;
    return `${fromStr} - ${toStr}`;
  },
  containsWordFromArray: (word: string, to_found: string[]) => {
    word = word.trim().toLowerCase();
    for (let i = 0; i < to_found.length; i++) {
      if (word.includes(to_found[i])) {
        return true;
      }
    }
    return false;
  },
};

export default Hp;
