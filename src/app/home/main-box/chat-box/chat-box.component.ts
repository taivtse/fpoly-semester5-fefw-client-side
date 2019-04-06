import {Component, Input, OnInit} from '@angular/core';
import {MessageItem} from '../../../model/MessageItem';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  @Input() messageItems: MessageItem[];

  constructor() {
  }

  ngOnInit() {
  }

}
