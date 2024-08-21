export interface IEventStatus {
  state: string;
  msg: string;
  totalConns?: number;
  currentConns?: number;
  inputBytes?: number;
  outputBytes?: number;
  totalErrs?: number;
}

export interface IEvent {
  kind: string;
  service: string;
  type: string;
  stats: IEventStatus;
}

export interface IEventsResponseDTO {
  events: IEvent[];
}

export interface IAuthUser {
  username: string;
  password: string;
  client: string;
}
