import { MenuPic, Weekday } from "./general";

export interface MenuData {
  id?: number;
  name: string;
  menu_pics: MenuPic[] | [];
  description: string;
  price: number;
  total_served?: number;
  rating?: number;
  is_public: boolean;
  pre_order_time: number | null;
  menu_schedule: OpenHours[];
  ingredients: string[];
  address: string;
}

export interface Time {
  hr: number;
  min: number;
}

export type OpenHours = {
  // [day in Weekday]: {
  from: Time | null;
  to: Time | null;
  day: number;

  // };
};
