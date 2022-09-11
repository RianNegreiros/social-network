import { createContext, useContext } from "react";
import ModalStore from "../models/modalStore";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
  activityStore: ActivityStore
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}