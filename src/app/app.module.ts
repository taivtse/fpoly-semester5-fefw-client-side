import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginModule} from './login/login.module';
import {HomeModule} from './home/home.module';
import {SharedData} from './shared/shared.data';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    HomeModule
  ],
  providers: [SharedData,
    {
      provide: SharedData,
      useValue: window['APP_DATA']
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
