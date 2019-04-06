import {Component, Input, OnInit} from '@angular/core';
import {MessageDataItem} from '../../../model/message-data.item';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() messageItem: MessageDataItem;

  constructor() {
  }

  ngOnInit() {
  }

}
