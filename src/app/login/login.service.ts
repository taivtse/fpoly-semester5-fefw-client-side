import {Injectable} from '@angular/core';
import {AuthService, FacebookLoginProvider, SocialUser} from 'angularx-social-login';
import {SharedData} from '../shared/shared.data';
import {ConstantData} from '../shared/constant.data';
import {StorageUtil} from '../shared/storage.util';
import {UserAuthApiService} from '../shared/user-auth-api.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private socialAuthService: AuthService,
              private userAuthApiService: UserAuthApiService) {
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
        return this.userAuthApiService.updateAuthUserData(SharedData.loggedInUser);
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

  checkSessionIn(): Promise<any> {
    return this.userAuthApiService.authenticateUser(SharedData.loggedInUser);
  }
}
