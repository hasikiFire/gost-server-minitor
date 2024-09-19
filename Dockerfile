# 使用官方的 Node.js 运行时镜像作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到容器中
# 可以利用 docker 缓存？
COPY package*.json ./

# 安装应用程序依赖
RUN npm install

# 全局安装 PM2
RUN npm install pm2 -g

# 复制整个项目到容器中
COPY . .

# 编译 NestJS 项目 (如果需要)
RUN npm run build


# 使用 PM2 运行应用
CMD ["pm2-runtime", "dist/main.js"]
