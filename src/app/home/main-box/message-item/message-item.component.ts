import {Component, Input, OnInit} from '@angular/core';
import {MessageItem} from '../../../model/MessageItem';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() messageItem: MessageItem;

  constructor() {
  }

  ngOnInit() {
  }

}
