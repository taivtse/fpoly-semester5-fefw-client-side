import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ConstantData} from '../../shared/constant.data';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  constructor(private httpClient: HttpClient) {
  }

  loadSearchUser(name: string): Promise<any> {
    let params = new HttpParams();
    params = params.append('name', name);
    return this.httpClient.get(ConstantData.API_SEARCH_USER_ENDPOINT, {params}).toPromise();
  }

}
