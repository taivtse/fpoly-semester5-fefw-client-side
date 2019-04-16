import {Injectable} from '@angular/core';
import {ConstantData} from './constant.data';
import * as SockJS from 'sockjs-client';
import {SharedData} from './shared.data';
import {CompatClient, IMessage, Message, Stomp, StompSubscription} from '@stomp/stompjs';
import {MessageSocketModel} from '../model/message-socket.model';
import {SocketDataModel} from '../model/socket-data.model';

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

  sendMessage(socketDataModel: SocketDataModel): void {
    const topic = `/app/chat/send/${socketDataModel.receivedProviderId}`;
    const headers = {
      token: SharedData.loggedInUser.token
    };
    this.stompClient.send(topic,
      headers,
      JSON.stringify(socketDataModel)
    );
  }

  onError(error) {
    console.log(error);
  }
}
