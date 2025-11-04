# 使用官方 Node.js 18 Alpine 镜像作为基础
FROM node:18-alpine AS base

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装生产环境依赖
RUN npm install --production

# 复制 Next.js 应用的其余文件
COPY . .

# 构建 Next.js 应用
RUN npm run build

# 暴露端口
EXPOSE 3000

# 启动 Next.js 应用
CMD ["npm", "start"]
