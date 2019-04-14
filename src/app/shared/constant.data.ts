export class ConstantData {
  public static readonly API_ENDPOINT = 'http://localhost:7991/api';
  public static readonly API_LOGIN_ENDPOINT = ConstantData.API_ENDPOINT.concat('/login');
  public static readonly API_LOGIN_AUTH_ENDPOINT = ConstantData.API_LOGIN_ENDPOINT.concat('/auth');

  public static readonly API_CHATBOX_ENDPOINT = ConstantData.API_ENDPOINT.concat('/chatbox');
  public static readonly API_MESSAGE_ENDPOINT = ConstantData.API_ENDPOINT.concat('/message');
  public static readonly API_USER_ENDPOINT = ConstantData.API_ENDPOINT.concat('/user');
  public static readonly API_SEARCH_USER_ENDPOINT = ConstantData.API_USER_ENDPOINT.concat('/search');

  public static readonly LOGGED_IN_USER_KEY = 'loggedInUser';

  constructor() {
  }
}
