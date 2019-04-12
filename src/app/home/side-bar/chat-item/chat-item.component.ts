import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatDataItem} from '../../../model/chat-data.item';

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
