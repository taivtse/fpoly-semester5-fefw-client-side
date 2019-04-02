import {Component, OnInit} from '@angular/core';
import {AuthService, FacebookLoginProvider, SocialUser} from 'angularx-social-login';
import {UserService} from './user.service';
import {AuthApiService} from './auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private socialUser: SocialUser;
  private loggedIn: boolean;

  public responseData: any;
  public userPostData = {
    email: '',
    name: '',
    provider: '',
    provider_id: '',
    provider_pic: '',
    token: ''
  };

  constructor(private socialAuthService: AuthService,
              public authApiService: AuthApiService,
              public userService: UserService) {
    this.userService.sessionIn();
  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.loggedIn = (user != null);
    });
  }

  public socialSignIn() {
    console.log(this.socialUser);
    // this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(userData => {
    //   console.log(userData);
    //   // this.apiConnection(userData);
    // });
  }

  socialSignOut(): void {
    this.socialAuthService.signOut();
  }

  apiConnection(data) {
    this.userPostData.email = data.email;
    this.userPostData.name = data.name;
    this.userPostData.provider = data.provider;
    this.userPostData.provider_id = data.id;
    this.userPostData.provider_pic = data.image;
    this.userPostData.token = data.token;

    this.authApiService.postData(this.userPostData).then(
      result => {
        this.responseData = result;
        if (this.responseData.userData) {
          this.userService.storeData(this.responseData.userData);
        }
      },
      err => {
        console.log('error');
      }
    );
  }

}
