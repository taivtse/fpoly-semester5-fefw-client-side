export class LoggedInUser {
  id: number;
  email: string;
  name: string;
  provider: string;
  providerId: string;
  photoUrl: string;
  token: string;

  constructor() {
  }
}

export class SharedData {
  public static loggedInUser: LoggedInUser;
  public static isLoggedIn = false;

  constructor() {
  }
}
