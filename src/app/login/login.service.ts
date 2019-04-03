import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService, FacebookLoginProvider, SocialUser} from 'angularx-social-login';
import {LoggedInUser, SharedData} from '../shared/shared.data';
import {ConstantData} from '../shared/constant.data';
import {StorageUtil} from '../shared/storage.util';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private httpClient: HttpClient,
              private socialAuthService: AuthService) {
  }

  static setLoggedInUserData(socialUser: SocialUser): void {
    SharedData.loggedInUser.email = socialUser.email;
    SharedData.loggedInUser.name = socialUser.name;
    SharedData.loggedInUser.provider = socialUser.provider;
    SharedData.loggedInUser.providerId = socialUser.id;
    SharedData.loggedInUser.photoUrl = socialUser.photoUrl;
    SharedData.loggedInUser.token = socialUser.authToken;
  }

  login(): Promise<void> {
    return this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(socialUser => {
        LoginService.setLoggedInUserData(socialUser);
        return this.postLoggedInUserDataToServer(SharedData.loggedInUser);
      })
      .then(resUser => {
        SharedData.loggedInUser = Object.assign(SharedData.loggedInUser, resUser);
        StorageUtil.setLocalStorage(ConstantData.LOGGED_IN_USER_KEY, SharedData.loggedInUser);
      });
  }

  logOut(): Promise<any> {
    StorageUtil.removeLocalStorage(ConstantData.LOGGED_IN_USER_KEY);
    return this.socialAuthService.signOut();
  }

  private authenticateUser(loggedInUser: LoggedInUser): Promise<any> {
    const url = ConstantData.API_LOGIN_AUTH_ENDPOINT;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(url, JSON.stringify(loggedInUser), {headers}).toPromise();
  }

  postLoggedInUserDataToServer(loggedInUser: LoggedInUser): Promise<any> {
    const url = ConstantData.API_LOGIN_ENDPOINT;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(url, JSON.stringify(loggedInUser), {headers}).toPromise();
  }

  checkSessionIn(): Promise<any> {
    return this.authenticateUser(SharedData.loggedInUser);
  }
}
