import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService, AuthServiceConfig, FacebookLoginProvider} from 'angularx-social-login';
import {LoginService} from './login.service';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';

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

const routes: Routes = [
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [LoginService, AuthService, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }]
})
export class LoginModule {
}
