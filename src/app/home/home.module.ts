import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from '@angular/router';
import {SideBoxComponent} from './side-box/side-box.component';
import {MainBoxComponent} from './main-box/main-box.component';
import {NewChatBoxComponent} from './main-box/new-chat-box/new-chat-box.component';
import {ExistedChatBoxComponent} from './main-box/existed-chat-box/existed-chat-box.component';
import { ChatItemListComponent } from './side-box/chat-item-list/chat-item-list.component';
import { ChatItemComponent } from './side-box/chat-item-list/chat-item/chat-item.component';
import { SearchItemListComponent } from './side-box/search-item-list/search-item-list.component';
import { SearchItemComponent } from './side-box/search-item-list/search-item/search-item.component';

const routes: Routes = [
  {
    path: 'chat', component: HomeComponent,
    children: [
      {
        path: 'new',
        component: NewChatBoxComponent
      },
      {
        path: 'with/:username',
        component: ExistedChatBoxComponent
      }
    ]
  },
];

@NgModule({
  declarations: [HomeComponent, SideBoxComponent, MainBoxComponent, NewChatBoxComponent, ExistedChatBoxComponent, ChatItemListComponent, ChatItemComponent, SearchItemListComponent, SearchItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class HomeModule {
}
