export class SocketMessageModel {
  id: number;
  content: string;
  date: Date;
  type: string;
  sentMemberId: number;
  sentUserProviderId: string;
  receivedUserProviderId: string;
}
