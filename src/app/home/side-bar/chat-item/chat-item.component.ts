import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ChatBoxModel} from '../../../model/chat-box.model';
import {ChatItemService} from './chat-item.service';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.css']
})
export class ChatItemComponent implements OnInit, OnChanges {
  @Input() chatBoxModel: ChatBoxModel;
  @Input() index: number;
  @Input() isActive: boolean;
  @Output() chatItemIndexChange = new EventEmitter<number>();


  constructor(private chatItemService: ChatItemService) {
  }

  ngOnInit() {
  }

  activeChatItem(): void {
    this.chatItemIndexChange.emit(this.index);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.chatBoxModel.readStatus && this.isActive && this.chatBoxModel.id) {
      this.chatItemService.updateReadStatusOfMemberInChatBox(this.chatBoxModel.id, true)
        .then(() => this.chatBoxModel.readStatus = true)
        .catch(err => err);
    }
  }
}
