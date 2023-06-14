import { MenuScheduleData } from "@/services/storage/data";
import { MenuData } from "@/services/types/menu.type";
import { FC, ReactNode, createContext, useState } from "react";
import { ProviderProps } from "./AuthProvider";

const initialFormState: MenuData = {
  name: "",
  description: "",
  price: 0,
  address: "",
  pre_order_time: null,
  menu_pics: [],
  ingredients: [],
  menu_schedule: [...MenuScheduleData],
  is_public: false,
};

export const MenuFormContext = createContext({ menuForm: initialFormState, setMenuForm: (menu: MenuData) => {} });

export const MenuFormProvider: FC<ProviderProps> = ({ children }) => {
  const [menuForm, setMenuForm] = useState(initialFormState);

  return <MenuFormContext.Provider value={{ menuForm, setMenuForm }}>{children}</MenuFormContext.Provider>;
};
