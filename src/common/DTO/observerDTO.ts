export interface IEventStatus {
  state: string;
  msg: string;
  totalConns?: number;
  currentConns?: number;
  inputBytes?: number;
  outputBytes?: number;
  totalErrs?: number;

  id?: string; // 用户ID
}

export interface IEvent {
  kind: string;
  service: string;
  type: string;
  stats: IEventStatus;
  client: string;
}

export interface IEventsResponseDTO {
  events: IEvent[];
}

export interface IAuthUser {
  username: string;
  password: string;
  client: string;
}

export interface ILimiterDTO {
  scope: string; // 范围，比如 "client"
  service: string; // 服务名称，比如 "service-0"
  network: string; // 网络协议，比如 "tcp"
  addr: string; // 地址，主机名和端口号，比如 "example.com:443"
  client: string; //   用户ID
  src: string; // 源地址，IP 和端口号，比如 "192.168.1.1:12345"
}
export interface ILimiterRepostDTO {
  in: number;
  out: number;
}
