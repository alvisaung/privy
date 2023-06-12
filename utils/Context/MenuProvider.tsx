import { MenuScheduleData } from "@/services/storage/data";
import { MenuData } from "@/services/types/menu.type";
import { ReactNode, createContext, useState } from "react";

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

export const MenuFormContext = createContext({ menuForm: initialFormState, setMenuForm: (menu) => {} });

export const MenuFormProvider = ({ children }: { children: ReactNode }) => {
  const [menuForm, setMenuForm] = useState(initialFormState);

  return <MenuFormContext.Provider value={{ menuForm, setMenuForm }}>{children}</MenuFormContext.Provider>;
};
