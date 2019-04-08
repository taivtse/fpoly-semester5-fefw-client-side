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

  constructor() {
  }

  ngOnInit() {
    this.scrollToBottom();
  }


  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.messagesWrapper.nativeElement.scrollTop = this.messagesWrapper.nativeElement.scrollHeight;
  }
}
