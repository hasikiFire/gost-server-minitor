declare global {
  interface IAuthUser {
    uid: number;
    pv: number;
    /** 过期时间 */
    exp?: number;
    /** 签发时间 */
    iat?: number;
    roles?: string[];
  }

  export interface IBaseResponse<T = any> {
    message: string;
    code: number;
    data?: T;
  }

  export interface IListRespData<T = any> {
    items: T[];
  }

  export interface IMQMessage {
    method: string;
    params: any; // 可以根据你的具体参数定义更详细的类型
  }
}

export {};
