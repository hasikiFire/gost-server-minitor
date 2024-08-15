export interface IEventStatus {
  state: string;
  msg: string;
  totalConns: number;
  currentConns: number;
  inputBytes: number;
  outputBytes: number;
  totalErrs: number;
}

export interface IEvent {
  kind: string;
  service: string;
  type: string;
  status: IEventStatus;
}

export interface IEventsResponseDTO {
  events: Event[];
}
