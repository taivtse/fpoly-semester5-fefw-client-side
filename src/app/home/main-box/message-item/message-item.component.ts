import {Component, Input, OnInit} from '@angular/core';
import {MessageItemData} from '../../../model/message-item.data';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() messageItem: MessageItemData;

  constructor() {
  }

  ngOnInit() {
  }

}
