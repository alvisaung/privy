export enum Weekday {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export interface User {
  name: string;
  profile_url: string;
  isChef?: boolean;
}

export interface ChefUser extends User {
  phone: string;
  address: string;
  about_me: string;
}

export interface MenuPic {
  url: string;
  pic_desc: string;
  file?: File;
}

export interface Img {
  pic_desc: string;
}
