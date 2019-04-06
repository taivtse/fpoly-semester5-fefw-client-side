import {Component, Input, OnInit} from '@angular/core';
import {MessageItemData} from '../../../model/message-item.data';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  @Input() messageItems: MessageItemData[];

  constructor() {
  }

  ngOnInit() {
  }

}
