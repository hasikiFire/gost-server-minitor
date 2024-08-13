import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class RequestService {
  private readonly defaultHeaders = {
    Authorization: 'Basic YWRtaW46YWRtaW5hZG1pbg==',
  };

  constructor(private readonly httpService: HttpService) {}

  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const headers = { ...this.defaultHeaders, ...(config?.headers || {}) };
    return firstValueFrom(
      this.httpService
        .get<T>(url, { ...config, headers })
        .pipe(map((response: any) => response.data)),
    );
  }

  post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const headers = { ...this.defaultHeaders, ...(config?.headers || {}) };
    return firstValueFrom(
      this.httpService
        .post<T>(url, data, { ...config, headers })
        .pipe(map((response: any) => response.data)),
    );
  }
}
