import {Injectable} from '@angular/core';
import {ConstantData} from './constant.data';
import * as SockJS from 'sockjs-client';
import {SharedData} from './shared.data';
import {CompatClient, IMessage, Message, Stomp, StompSubscription} from '@stomp/stompjs';
import {SocketMessageModel} from '../model/socket-message.model';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  // socket
  private stompClient: CompatClient;
  private chanelSubscription: StompSubscription;

  constructor() {
  }

  connect(onMessageReceivedCallBack) {
    const socket = new SockJS(ConstantData.SERVER_SOCKET_ENDPOINT);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, (frame) => {
      const channelId = SharedData.loggedInUser.providerId;
      this.chanelSubscription = this.stompClient.subscribe(`/channel/${channelId}`,
        (message: Message) => onMessageReceivedCallBack(message.body));
    }, (error) => this.onError(error));
  }

  sendMessage(socketMessageModel: SocketMessageModel): Promise<any> {
    const topic = `/app/chat/send/${socketMessageModel.receivedUserProviderId}`;
    const headers = {
      token: SharedData.loggedInUser.token
    };
    return new Promise<any>(() => {
      this.stompClient.send(topic,
        headers,
        JSON.stringify(socketMessageModel)
      );
    });
  }

  onError(error) {
    console.log(error);
  }
}
