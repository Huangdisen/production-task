# 构建阶段
FROM ccr.ccs.tencentyun.com/library/node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install --registry=https://registry.npmmirror.com
COPY . .
RUN npm run build

# 生产阶段
FROM ccr.ccs.tencentyun.com/library/nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 