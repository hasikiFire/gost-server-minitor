const { cpus } = require('node:os');

const cpuLen = cpus().length;

module.exports = {
  apps: [
    {
      name: 'gost-server-monitor',
      script: 'dist/main.js',
      autorestart: true,
      exec_mode: 'cluster',
      watch: false,
      instances: 1,
      max_memory_restart: '1G',
      args: '',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.APP_PORT,
      },
    },
  ],
};
