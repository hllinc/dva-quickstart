// cookie操作函数的接口定义
export interface JsonObj{
  [propsName: string]: any
}

export interface GetCookie {
  (name:string):(string|JsonObj)
}
export interface SetCookie {
  (name:string,value:string,days: (number|string)): void
}

// 对 request 来进行类型的定义
export interface RequestOptions {
    url: string,
    method?: string,
    params?: JsonObj,
    data?: JsonObj,
    headers?: JsonObj,
    fetchType?: string
}
export interface Request<T> {
  (options: RequestOptions): Promise<T>
}

export interface GIO {
  Plugin(options?: Object): GIO;
}