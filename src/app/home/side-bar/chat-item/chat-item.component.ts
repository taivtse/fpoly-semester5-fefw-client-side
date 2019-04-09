import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
  @Input() isActive: boolean;
  @Output() chatItemIndexChange = new EventEmitter<number>();

  ngOnInit() {
  }

  activeChatItem(): void {
    this.chatItemIndexChange.emit(this.index);
  }
}
