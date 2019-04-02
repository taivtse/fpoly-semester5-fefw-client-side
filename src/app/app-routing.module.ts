import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ContainerComponent} from './container/container.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'home', component: ContainerComponent},
  // {path: 'chat/:username', component: ContainerComponent},
  // {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  declarations: [
    LoginComponent,
    ContainerComponent
  ]
})
export class AppRoutingModule { }
