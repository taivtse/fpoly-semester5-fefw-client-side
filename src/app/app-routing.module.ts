import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login/login-routing.module';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  // {path: 'chat/:username', component: ContainerComponent},
  // {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    LoginRoutingModule,
    RouterModule.forRoot(routes),
    CommonModule],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
