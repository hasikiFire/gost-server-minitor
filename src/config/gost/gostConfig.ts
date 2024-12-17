import { ServiceConfig } from 'src/common/DTO/gost';

export const DefaultGostConfig: ServiceConfig = {
  handler: {
    type: 'http',
    auther: 'auther-0',
    limiter: 'limiter-0',
    observer: 'observerUser',
    metadata: {
      enableStats: true,
      observePeriod: '5s',
    },
  },
  listener: {
    type: 'tls',
  },
  observer: 'observerService',
  metadata: {
    knock: 'www.google.com',
    probeResist: 'file:/var/www/html/index.html',
    enableStats: 'true',
    observePeriod: '120s',
  },
};
