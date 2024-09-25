FROM node:20-alpine

ENV APP_PORT=30000 

WORKDIR /app

RUN npm install -g pnpm
RUN npm install -g pm2

# 利用 Docker 缓存，首先只复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# 复制整个项目到容器中
COPY . .

# 构建项目
RUN pnpm run build

# 使用 PM2 运行应用
CMD ["pm2-runtime", "start", "ecosystem.config.js"]

EXPOSE $APP_PORT