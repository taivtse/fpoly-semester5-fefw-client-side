export class SocketMessageModel {
  id: number = null;
  content: string = null;
  date: Date = null;
  type: string = null;
  sentMemberId: number = null;
  sentUserProviderId: string = null;
  receivedUserProviderId: string = null;
}
