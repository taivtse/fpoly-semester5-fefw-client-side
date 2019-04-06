import {Component, Input, OnInit} from '@angular/core';
import {ChatBoxDataItem} from '../../../model/chat-box-data.item';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  @Input() chatBoxDataItem: ChatBoxDataItem;

  constructor() {
  }

  ngOnInit() {
  }

}
