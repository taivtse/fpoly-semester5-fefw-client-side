import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MessageDataItem} from '../../model/message-data.item';
import {ChatBoxDataItem} from '../../model/chat-box-data.item';

@Component({
  selector: 'app-main-box',
  templateUrl: './main-box.component.html',
  styleUrls: ['./main-box.component.css']
})
export class MainBoxComponent implements OnInit {
  chatBoxParam: string;
  messageItems: MessageDataItem[] = [];

  chatBoxMap: Map<string, ChatBoxDataItem> = new Map<string, ChatBoxDataItem>();

  constructor(private route: ActivatedRoute) {
    const message = new MessageDataItem();
    message.content = 'hello';
    message.memberId = 1;
    message.date = new Date();
    message.cssClass = 'sent';
    message.tooltipPlacement = 'left';
    message.photoUrl = 'https://graph.facebook.com/982392238618347/picture?type=normal';
    const chatbox1: ChatBoxDataItem = new ChatBoxDataItem();

    // this.chatBoxMap.set('tai', );

    const message1 = new MessageDataItem();
    message1.content = 'hi';
    message1.memberId = 2;
    message1.date = new Date();
    message1.cssClass = 'replies';
    message1.tooltipPlacement = 'right';
    message1.photoUrl = 'https://graph.facebook.com/982392238618347/picture?type=normal';
    this.messageItems.push(message1);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.chatBoxParam = params.get('chatBoxParam');
    });
  }

}
