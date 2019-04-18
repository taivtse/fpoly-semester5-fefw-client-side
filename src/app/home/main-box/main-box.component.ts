import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MessageDataItem} from '../../model/message-data.item';
import {ChatBoxDataItem} from '../../model/chat-box-data.item';
import {SharedData} from '../../shared/shared.data';
import {ChatDataItemService} from '../../shared/chat-data-item.service';
import {ChatService} from '../../shared/chat.service';
import {SocketMessageModel} from '../../model/socket-message.model';
import {MessageType} from '../../model/message.type';
import {BeanUtil} from '../../shared/bean.util';
import {ChatBoxModel} from '../../model/chat-box.model';
import {MemberModel} from '../../model/member.model';
import {UserModel} from '../../model/user.model';

@Component({
  selector: 'app-main-box',
  templateUrl: './main-box.component.html',
  styleUrls: ['./main-box.component.css']
})
export class MainBoxComponent implements OnInit, OnDestroy {
  @ViewChild('chattingInput') private chattingInput: ElementRef<HTMLInputElement>;
  chatBoxParam: string;
  chatBoxDataItemMap = new Map<string, ChatBoxDataItem>();
  currentChatBoxDataItem: ChatBoxDataItem;
  isShowMainBox = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private chatDataItemService: ChatDataItemService,
              private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.connect(this, this.onMessageReceived);
    this.chatDataItemService.chatDataItemsNotify.subscribe(() => {
      this.chatDataItemService.chatBoxModels.forEach(chatBoxModel => {
        if (!this.chatBoxDataItemMap.has(chatBoxModel.chatBoxParam)) {
          const chatBoxDataItem = new ChatBoxDataItem();
          BeanUtil.copyProperties(chatBoxDataItem, chatBoxModel);
          this.chatBoxDataItemMap.set(chatBoxModel.chatBoxParam, chatBoxDataItem);
        }
      });

      if (this.chatDataItemService.chatBoxModels.length === 1) {
        this.chatDataItemService.isChatDataItemsLoaded = true;
        this.chatDataItemService.chatBoxModels[0].readStatus = true;
        this.router.navigate(['/chat', this.chatDataItemService.chatBoxModels[0].chatBoxParam]);
      }

      if (this.chatDataItemService.isChatDataItemsLoaded) {
        // subscribe param once
        this.chatDataItemService.isChatDataItemsLoaded = false;
        this.isShowMainBox = true;

        this.route.paramMap.subscribe((params: ParamMap) => {
          // set current chat box data item
          this.chatBoxParam = params.get('chatBoxParam');
          this.currentChatBoxDataItem = this.chatBoxDataItemMap.get(this.chatBoxParam);

          // focus and set the current typing message
          this.chattingInput.nativeElement.focus();
          this.chattingInput.nativeElement.value = this.getCurrentTypingMessageInChatInput();
        });

        // set active for the chat item
        const activeChatItemIndex = this.getChatItemIndex();
        this.chatDataItemService.changeActiveChatItemIndex(activeChatItemIndex);
      }
    });
  }

  getChatItemIndex(): number {
    let index = -1;
    for (const key of Array.from(this.chatBoxDataItemMap.keys())) {
      index++;
      if (key === this.chatBoxParam) {
        return index;
      }
    }
    return -1;
  }

  onSendMessage(): void {
    if (this.chattingInput.nativeElement.value.trim() === '') {
      return;
    }

    // process if chat box not already exists
    const socketMessageModel = new SocketMessageModel();
    const activeChatBoxModel = this.chatDataItemService.getActiveChatBoxModel();
    if (this.currentChatBoxDataItem.id == null) {
      this.chatService.createNewChatBox()
        .then((chatBoxModel: ChatBoxModel) => {
          // create new chat box
          activeChatBoxModel.id = chatBoxModel.id;
          this.currentChatBoxDataItem.id = chatBoxModel.id;
        }).then(() => {
        // create my new member
        const myMemberModel = new MemberModel();
        myMemberModel.chatBox = activeChatBoxModel;
        myMemberModel.user = SharedData.loggedInUser;

        this.chatService.createNewMember(myMemberModel)
          .then((memberModel: MemberModel) => {
            this.currentChatBoxDataItem.memberId = memberModel.id;
          }).then(() => {
          // create partner member in chat box
          const partnerMemberModel = new MemberModel();
          partnerMemberModel.chatBox = activeChatBoxModel;
          const partnerUser = new UserModel();
          partnerUser.id = activeChatBoxModel.partnerUserId;
          partnerMemberModel.user = partnerUser;

          this.chatService.createNewMember(partnerMemberModel)
            .then((memberModel: MemberModel) => {
              socketMessageModel.receivedMemberId = memberModel.id;
              this.doSendMessage(socketMessageModel);
            });
        });
      });
    } else {
      this.doSendMessage(socketMessageModel);
    }
  }

  doSendMessage(socketMessageModel: SocketMessageModel) {
    socketMessageModel.content = this.chattingInput.nativeElement.value.trim();
    socketMessageModel.date = new Date();
    socketMessageModel.type = MessageType.TEXT;
    socketMessageModel.sentMemberId = this.currentChatBoxDataItem.memberId;
    socketMessageModel.sentUserProviderId = SharedData.loggedInUser.providerId;
    socketMessageModel.receivedUserProviderId = this.chatBoxParam;

    this.chatService.sendMessage(socketMessageModel)
      .then(() => {
        const messageDataItem = new MessageDataItem();
        BeanUtil.copyProperties(messageDataItem, socketMessageModel);
        messageDataItem.tooltipPlacement = 'left';
        messageDataItem.photoUrl = SharedData.loggedInUser.photoUrl;
        messageDataItem.cssClass = 'sent';
        this.chatBoxDataItemMap.get(this.chatBoxParam).messageDataItems.push(messageDataItem);
        this.progressAfterSendMessage(messageDataItem);
      }).catch(err => console.log(err));
  }

  onMessageReceived(_this, body: string): void {
    const socketMessageModel: SocketMessageModel = JSON.parse(body);
    const messageDataItem = new MessageDataItem();
    BeanUtil.copyProperties(messageDataItem, socketMessageModel);
    messageDataItem.tooltipPlacement = 'right';
    messageDataItem.cssClass = 'replies';

    const sentUserProviderId = socketMessageModel.sentUserProviderId;

    if (_this.chatBoxDataItemMap.has(sentUserProviderId)) {
      for (let i = 0; i < _this.chatDataItemService.chatBoxModels.length; i++) {
        const curChatBoxModel = _this.chatDataItemService.chatBoxModels[i];

        if (curChatBoxModel.chatBoxParam === sentUserProviderId) {
          _this.chatDataItemService.moveChatItemToTop(i);

          //  set last message content and last message date in chat item
          _this.chatDataItemService.chatBoxModels[0].lastMessageContent = messageDataItem.content;
          _this.chatDataItemService.chatBoxModels[0].lastMessageDate = messageDataItem.date;

          // set read status if user in another chat box
          if (_this.chatBoxParam !== sentUserProviderId) {
            _this.chatDataItemService.chatBoxModels[0].readStatus = false;
          }
          messageDataItem.photoUrl = _this.currentChatBoxDataItem.photoUrl;
          _this.chatBoxDataItemMap.get(sentUserProviderId).messageDataItems.push(messageDataItem);
          _this.checkReadStatus(_this, socketMessageModel);
          break;
        }
      }
    } else {
      _this.chatService.getChatBoxDataItemByMemberId(socketMessageModel.receivedMemberId)
        .then((chatBoxModel: ChatBoxModel) => {
          _this.chatDataItemService.chatBoxModels.unshift(chatBoxModel);
          _this.chatDataItemService.chatDataItemsNotify.next(null);
          _this.chatDataItemService.changeActiveChatItemincreaseOne();
          messageDataItem.photoUrl = _this.currentChatBoxDataItem.photoUrl;
          _this.chatBoxDataItemMap.get(sentUserProviderId).messageDataItems.push(messageDataItem);
          _this.checkReadStatus(_this, socketMessageModel);
        }).catch(() => {
      });
    }
  }

  private checkReadStatus(_this, socketMessageModel: SocketMessageModel) {
    const receivedChatBoxDataItem = _this.chatBoxDataItemMap.get(socketMessageModel.sentUserProviderId);
    const memberId = receivedChatBoxDataItem.memberId;
    const unRead = _this.chatBoxParam === socketMessageModel.sentUserProviderId;
    _this.chatService.updateReadStatusByMemberId(memberId, unRead)
      .then(() => receivedChatBoxDataItem.readStatus = unRead);
  }

  progressAfterSendMessage(messageDataItem: MessageDataItem) {
    this.chattingInput.nativeElement.focus();
    this.chattingInput.nativeElement.value = '';
    this.currentChatBoxDataItem.currentTypingMessage = '';

    //  set current chat item to top
    this.chatDataItemService.moveActiveChatItemToTop();

    //  set last message content and last message date in chat item
    this.chatDataItemService.chatBoxModels[0].lastMessageContent = 'You: ' + messageDataItem.content;
    this.chatDataItemService.chatBoxModels[0].lastMessageDate = messageDataItem.date;
  }

  setCurrentTypingMessageInChatInput() {
    if (this.currentChatBoxDataItem) {
      this.currentChatBoxDataItem.currentTypingMessage = this.chattingInput.nativeElement.value;
    }
  }

  getCurrentTypingMessageInChatInput(): string {
    if (this.currentChatBoxDataItem) {
      return this.currentChatBoxDataItem.currentTypingMessage;
    }
    return '';
  }

  onKeyUpEventHandler(event) {
    this.setCurrentTypingMessageInChatInput();
  }

  onKeyPressEventHandler(event) {
    if (event.code === 'Enter') {
      this.onSendMessage();
    }
  }

  ngOnDestroy(): void {
    this.chatService.chanelSubscription.unsubscribe({});
  }
}
