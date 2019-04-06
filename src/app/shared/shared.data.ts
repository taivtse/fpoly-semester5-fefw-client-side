import {UserModel} from '../model/user.model';

export class SharedData {
  public static loggedInUser: UserModel;
  public static isLoggedIn = false;
  public static activeChatItemIndex = -1;

  constructor() {
  }
}
