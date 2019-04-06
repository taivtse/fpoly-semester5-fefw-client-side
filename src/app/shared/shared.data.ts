import {UserModel} from '../model/UserModel';

export class SharedData {
  public static loggedInUser: UserModel;
  public static isLoggedIn = false;

  constructor() {
  }
}
