import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService, AuthServiceConfig, FacebookLoginProvider} from 'angularx-social-login';
import {AuthApiService} from './auth-api.service';
import {UserService} from './user.service';

export function getAuthServiceConfigs() {
  return new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('350926815630519')
      }
    ]
  );
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthApiService, UserService, AuthService, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }]
})
export class LoginModule {
}
