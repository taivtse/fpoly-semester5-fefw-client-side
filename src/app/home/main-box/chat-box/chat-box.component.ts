import {AfterViewChecked, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ChatBoxDataItem} from '../../../model/chat-box-data.item';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, AfterViewChecked {
  @Input() chatBoxDataItem: ChatBoxDataItem;
  @ViewChild('messagesWrapper') private messagesWrapper: ElementRef;
  private messageDataItemLength = 0;

  constructor() {
  }

  ngOnInit() {
    this.messageDataItemLength = this.chatBoxDataItem.messageDataItems.length;
    this.scrollToBottom();
  }


  ngAfterViewChecked(): void {
    const newMessageDataItemLength = this.chatBoxDataItem.messageDataItems.length;
    if (this.messageDataItemLength !== newMessageDataItemLength) {
      this.messageDataItemLength = newMessageDataItemLength;
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    this.messagesWrapper.nativeElement.scrollTop = this.messagesWrapper.nativeElement.scrollHeight;
  }
}
