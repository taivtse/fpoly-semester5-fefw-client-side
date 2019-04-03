export class ConstantData {
  public static readonly API_ENDPOINT = 'http://localhost:7991';
  public static readonly API_LOGIN_ENDPOINT = ConstantData.API_ENDPOINT.concat('/api/login');
  public static readonly API_LOGIN_AUTH_ENDPOINT = ConstantData.API_LOGIN_ENDPOINT.concat('/auth');

  public static readonly LOGGED_IN_USER_KEY = 'loggedInUser';

  constructor() {
  }
}
