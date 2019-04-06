import {Component, Input, OnInit} from '@angular/core';
import {MessageDataItem} from '../../../model/message-data.item';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  @Input() messageItems: MessageDataItem[];

  constructor() {
  }

  ngOnInit() {
  }

}
