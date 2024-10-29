import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class RequestService {
  private readonly defaultHeaders = {
    Authorization: 'Basic YWRtaW46YWRtaW5hZG1pbg==',
  };

  constructor(private readonly httpService: HttpService) {}

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const headers = { ...this.defaultHeaders, ...(config?.headers || {}) };
    return firstValueFrom(
      this.httpService
        .get<T>(url, { ...config, headers })
        .pipe(map((response: any) => response.data)),
    );
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const headers = { ...this.defaultHeaders, ...(config?.headers || {}) };
    return firstValueFrom(
      this.httpService.post<T>(url, data, { ...config, headers }).pipe(
        map((response: any) => response.data),
        catchError((error) => {
          return throwError(() => error.response?.data);
          // if (error.response && error.response.status === 400) {
          //   // 如果状态码为 400，返回 error.response.data
          //   return throwError(() => error.response.data);
          // }
          // return throwError(() => error);
        }),
      ),
    );
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const headers = { ...this.defaultHeaders, ...(config?.headers || {}) };
    return firstValueFrom(
      this.httpService.put<T>(url, data, { ...config, headers }).pipe(
        map((response: any) => response.data),
        catchError((error) => {
          return throwError(() => error.response?.data);
        }),
      ),
    );
  }

  // 新增 delete 方法
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const headers = { ...this.defaultHeaders, ...(config?.headers || {}) };
    return firstValueFrom(
      this.httpService.delete<T>(url, { ...config, headers }).pipe(
        map((response: any) => response.data),
        catchError((error) => {
          return throwError(() => error.response?.data);
        }),
      ),
    );
  }
}
