import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from '@angular/router';
import {SideBarComponent} from './side-bar/side-bar.component';
import {MainBoxComponent} from './main-box/main-box.component';
import {ChatItemComponent} from './side-bar/chat-item/chat-item.component';
import {ChatItemListComponent} from './side-bar/chat-item-list/chat-item-list.component';
import { SearchUserListComponent } from './side-bar/search-user-list/search-user-list.component';
import { SearchUserComponent } from './side-bar/search-user/search-user.component';
import { ChatBoxComponent } from './main-box/chat-box/chat-box.component';

const routes: Routes = [
  {path: 'chat', component: HomeComponent},
  {path: 'chat/:chatBoxId', component: HomeComponent},
];

@NgModule({
  declarations: [HomeComponent, SideBarComponent, MainBoxComponent,
    ChatItemComponent, ChatItemListComponent, SearchUserListComponent, SearchUserComponent, ChatBoxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class HomeModule {
}
