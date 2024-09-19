#!/bin/bash

# 退出时遇到任何错误
set -e

# 定义环境
ENV=${1:-main} # 默认环境为 main

# 定义分支
BRANCH_NAME=$ENV

# 定义 Docker 镜像和容器名称
IMAGE_NAME="hasikifire/gost-server-$ENV"
CONTAINER_NAME="gost-server-$ENV"

# 定义 GitHub 仓库 URL 和本地路径
REPO_URL="https://github.com/hasikiFire/gost-server-minitor.git"
LOCAL_PATH="$ENV"

# 检查环境参数是否有效
if [[ "$ENV" != "test" && "$ENV" != "main" ]]; then
  echo "无效的环境参数。请使用 'test' 或 'main'."
  exit 1
fi

echo "创建 $LOCAL_PATH 目录..."
rm -rf $LOCAL_PATH
mkdir -p $LOCAL_PATH
chmod 755 $LOCAL_PATH

echo "克隆仓库..."
git clone $REPO_URL $LOCAL_PATH

echo "复制 .env.production "
mv -f .env.production "$LOCAL_PATH/.env.production"

cd $LOCAL_PATH
# 切换到指定分支
echo "切换到 $BRANCH_NAME 分支..."
git checkout $BRANCH_NAME

# Step 3: 构建 Docker 镜像
echo "构建 Docker 镜像..."
docker build -t $IMAGE_NAME .

# Step 4: 停止并删除现有的 Docker 容器
containers=$(docker ps -a -q -f name=$CONTAINER_NAME)
if [ -n "$containers" ]; then
  echo "停止现有容器..."
  docker stop $CONTAINER_NAME
  echo "删除容器..."
  docker rm $CONTAINER_NAME
else
  echo "没有正在运行的容器"
fi

# Step 5: 运行新的 Docker 容器
echo "运行新的 Docker 容器..."
docker run -d --name $CONTAINER_NAME --network host $IMAGE_NAME

echo "部署完成。"