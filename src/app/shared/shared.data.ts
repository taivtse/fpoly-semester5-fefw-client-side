import {UserModel} from '../model/user.model';

export class SharedData {
  public static loggedInUser: UserModel;
  public static chatBoxListLoadTime = 1;

  constructor() {
  }
}
