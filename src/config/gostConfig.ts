import { ServiceConfig } from 'src/DTO/gost';

export const DefaultGostConfig: ServiceConfig = {
  handler: {
    type: 'http2',
    auther: 'auther-0',
    limiter: 'limiter-0',
    observer: 'observer-0',
    metadata: {
      enableStats: true,
      observePeriod: '5s',
    },
  },
  listener: {
    type: 'http2',
  },
  observer: 'observer-0',
  metadata: {
    knock: 'www.google.com',
    probeResist: 'file:/var/www/html/index.html',
    enableStats: 'true',
    observePeriod: '120s',
  },
};
