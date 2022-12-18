import {makeAutoObservable} from "mobx";
import {User} from "../utils/types";

class UserStore {
  public user: User | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setUser(user: User | null) {
    this.user = user
  }
}

export const userStore = new UserStore()