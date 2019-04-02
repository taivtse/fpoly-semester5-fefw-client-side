import {Component, OnInit} from '@angular/core';
import {AuthService, FacebookLoginProvider} from 'angular-6-social-login';
import {UserService} from './user.service';
import {AuthApiService} from './auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
  }

  public socialSignIn() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(userData => {
      console.log(userData);
      // this.apiConnection(userData);
    });
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
