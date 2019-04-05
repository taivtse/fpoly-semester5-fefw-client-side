import {LoggedInUser} from '../model/LoggedInUser';

export class SharedData {
  public static loggedInUser: LoggedInUser;
  public static isLoggedIn = false;

  constructor() {
  }
}
