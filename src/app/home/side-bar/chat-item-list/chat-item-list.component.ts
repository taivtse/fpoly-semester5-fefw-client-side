import {Component, OnInit} from '@angular/core';
import {ChatDataItemService} from '../../../shared/chat-data-item.service';
import {ChatBoxModel} from '../../../model/chat-box.model';

@Component({
  selector: 'app-chat-item-list',
  templateUrl: './chat-item-list.component.html',
  styleUrls: ['./chat-item-list.component.css']
})
export class ChatItemListComponent implements OnInit {
  currentActiveChatItemIndex: number;
  chatBoxModels: ChatBoxModel[] = [];

  constructor(private chatDataItemService: ChatDataItemService) {
  }

  ngOnInit() {
    this.chatDataItemService.chatDataItemsNotify.subscribe(() => {
      this.chatBoxModels = this.chatDataItemService.chatBoxModels;
    });
    this.chatDataItemService.getActiveChatItemIndex().subscribe(index => {
      this.currentActiveChatItemIndex = index;
    });
  }

  changeActiveChatItem(index: number) {
    this.chatDataItemService.changeActiveChatItemIndex(index);
  }
}
