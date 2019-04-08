import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SharedData} from '../../../shared/shared.data';
import {ChatDataItem} from '../../../model/chat-data.item';
import {ChatDataItemService} from '../../../shared/chat-data-item.service';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.css']
})
export class ChatItemComponent implements OnInit {
  @Input() chatDataItem: ChatDataItem;
  @Input() index: number;
  isActive: boolean;

  constructor(private chatDataItemService: ChatDataItemService) {
  }

  ngOnInit() {
    this.chatDataItemService.currentChatItemIndex.subscribe(index => {
      this.isActive = index === this.index;
    });
  }

  activeChatItem(): void {
    this.chatDataItemService.changeActiveChatItemIndex(this.index);
  }
}
