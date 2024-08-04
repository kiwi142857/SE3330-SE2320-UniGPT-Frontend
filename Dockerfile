# 使用 Node.js 作为基础镜像
FROM node:21

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果有）到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

ARG REACT_APP_IP
ARG REACT_APP_PORT

ENV REACT_APP_IP=$REACT_APP_IP
ENV REACT_APP_PORT=$REACT_APP_PORT


# 运行构建命令
RUN npm run build

# 全局安装 serve
RUN npm install -g serve

# 暴露默认的 serve 端口
EXPOSE 3000

# 启动应用
CMD ["serve", "-s", "build", "-l", "3000"]
