# 生产任务发布单

一个简单的生产任务管理系统，支持添加、删除任务，并提供打印功能。

## Docker 使用说明

### 方式一：使用 docker-compose（推荐）

1. 确保已安装 Docker 和 docker-compose
2. 在项目目录下运行：
   ```bash
   docker-compose up -d
   ```
3. 打开浏览器访问：http://localhost:8080

### 方式二：直接使用 Docker

1. 构建镜像：
   ```bash
   docker build -t production-task .
   ```
2. 运行容器：
   ```bash
   docker run -d -p 8080:80 production-task
   ```
3. 打开浏览器访问：http://localhost:8080

## 数据说明

- 所有数据存储在浏览器的 localStorage 中
- 清除浏览器数据会导致数据丢失
- 建议定期通过打印功能备份数据

## 主要功能

- 添加生产任务（商品名称、规格、件数、奖类等）
- 支持历史记录自动完成
- 任务列表管理（查看、删除）
- 打印任务列表 