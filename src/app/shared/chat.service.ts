import {Injectable} from '@angular/core';
import {ConstantData} from './constant.data';
import * as SockJS from 'sockjs-client';
import {SharedData} from './shared.data';
import {CompatClient, Message, Stomp, StompSubscription} from '@stomp/stompjs';
import {SocketMessageModel} from '../model/socket-message.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {MemberModel} from '../model/member.model';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  isSocketAvailable = false;
  // socket
  stompClient: CompatClient;
  chanelSubscription: StompSubscription;

  constructor(private httpClient: HttpClient) {
  }

  connect(instance, onMessageReceivedCallBack) {
    const socket = new SockJS(ConstantData.SERVER_SOCKET_ENDPOINT);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, (frame) => {
      const channelId = SharedData.loggedInUser.providerId;
      this.chanelSubscription = this.stompClient.subscribe(`/channel/${channelId}`,
        (message: Message) => onMessageReceivedCallBack(instance, message.body));
      this.isSocketAvailable = true;
    }, (error) => this.onError(error));
  }

  sendMessage(socketMessageModel: SocketMessageModel): Promise<any> {
    const topic = `/app/chat/send/${socketMessageModel.receivedUserProviderId}`;
    const headers = {
      token: SharedData.loggedInUser.token
    };
    return new Promise<any>((resolve, reject) => {
      this.stompClient.send(topic,
        headers,
        JSON.stringify(socketMessageModel)
      );
      resolve(socketMessageModel);
    });
  }

  onError(error) {
    console.log(error);
  }

  getChatBoxDataItemByMemberId(memberId: number): Promise<any> {
    let params = new HttpParams();
    params = params.append('memberId', String(memberId));
    params = params.append('userId', String(SharedData.loggedInUser.id));
    return this.httpClient.get(ConstantData.API_CHATBOX_ENDPOINT.concat('/find-by/member'), {params})
      .toPromise();
  }

  createNewChatBox(): Promise<any> {
    return this.httpClient.post(ConstantData.API_CHATBOX_ENDPOINT, {}).toPromise();
  }

  createNewMember(memberModel: MemberModel): Promise<any> {
    return this.httpClient.post(ConstantData.API_MEMBER_ENDPOINT, memberModel).toPromise();
  }

  updateReadStatusByMemberId(memberId: number, readStatus: boolean): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const data = {memberId, readStatus};
    return this.httpClient.put(ConstantData.API_MEMBER_ENDPOINT, data).toPromise();
  }
}
