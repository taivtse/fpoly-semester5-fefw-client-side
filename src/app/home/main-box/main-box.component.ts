import {Component, OnInit} from '@angular/core';
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
  chatBoxDataItemMap: Map<string, ChatBoxDataItem> = new Map<string, ChatBoxDataItem>();
  currentChatBoxDataItem: ChatBoxDataItem;

  constructor(private route: ActivatedRoute) {
    this.chatBoxDataItemMap.set('2', null);
    this.chatBoxDataItemMap.set('1', null);
    this.chatBoxDataItemMap.set('a', null);
    const message = new MessageDataItem();
    message.content = 'hello';
    message.memberId = 1;
    message.date = new Date();
    message.cssClass = 'sent';
    message.tooltipPlacement = 'left';
    message.photoUrl = 'https://graph.facebook.com/982392238618347/picture?type=normal';
    const chatbox: ChatBoxDataItem = new ChatBoxDataItem();
    chatbox.messageDataItems.push(message);
    this.chatBoxDataItemMap.set('tai', chatbox);

    const message1 = new MessageDataItem();
    message1.content = 'hi';
    message1.memberId = 2;
    message1.date = new Date();
    message1.cssClass = 'replies';
    message1.tooltipPlacement = 'right';
    message1.photoUrl = 'https://graph.facebook.com/982392238618347/picture?type=normal';
    const chatbox1: ChatBoxDataItem = new ChatBoxDataItem();
    chatbox1.messageDataItems.push(message1);
    this.chatBoxDataItemMap.set('minh', chatbox1);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.chatBoxParam = params.get('chatBoxParam');
      this.currentChatBoxDataItem = this.chatBoxDataItemMap.get(this.chatBoxParam);
    });
  }

}
