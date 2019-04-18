import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MessageModel} from '../../../model/message.model';
import {SharedData} from '../../../shared/shared.data';
import {ConstantData} from '../../../shared/constant.data';
import {ChatBoxModel} from '../../../model/chat-box.model';

@Injectable({
  providedIn: 'root'
})
export class ChatBoxService {

  constructor(private httpClient: HttpClient) {
  }

  public getMessagesByChatBoxId(chatBoxId: number): Promise<any> {
    let params = new HttpParams();
    params = params.append('chatBoxId', String(chatBoxId));
    return this.httpClient.get(ConstantData.API_MESSAGE_ENDPOINT, {params}).toPromise();
  }
}
