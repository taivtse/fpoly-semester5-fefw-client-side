import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ConstantData} from '../../../shared/constant.data';

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
