import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedData} from '../../../shared/shared.data';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.css']
})
export class ChatItemComponent implements OnInit {
  isActive: boolean;
  index: number;

  constructor() {
  }

  ngOnInit() {
  }

  activeChatItem(): void {
    // this.isActive = true;
    SharedData.activeChatItemIndex = this.index;
    console.log(SharedData.activeChatItemIndex);
  }
}
