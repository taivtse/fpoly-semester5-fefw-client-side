import {UserModel} from '../model/user.model';

export class SharedData {
  public static loggedInUser: UserModel;

  constructor() {
  }
}
