import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatBoxModel} from '../../../model/chat-box.model';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.css']
})
export class ChatItemComponent implements OnInit {
  @Input() chatDataItem: ChatBoxModel;
  @Input() index: number;
  @Input() isActive: boolean;
  @Output() chatItemIndexChange = new EventEmitter<number>();

  ngOnInit() {
  }

  activeChatItem(): void {
    this.chatItemIndexChange.emit(this.index);
  }
}
