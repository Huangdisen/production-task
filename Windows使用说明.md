# Windows 电脑使用说明

## 方法一：直接双击打开（最简单）

1. 解压 `生产任务发布单-静态版.zip`
2. 进入 `dist` 文件夹
3. 找到 `index.html` 文件
4. 直接双击打开（建议使用 Chrome 或 Edge 浏览器）

## 方法二：使用 Python（推荐）

1. 检查是否安装了 Python
   - 按 `Win + R` 打开运行
   - 输入 `cmd` 并回车
   - 在命令提示符中输入：`python --version`
   - 如果显示版本号，说明已安装

2. 如果没有 Python：
   - 访问 https://www.python.org/downloads/windows/
   - 下载 Python（建议 3.x 版本）
   - 安装时勾选 "Add Python to PATH"

3. 运行程序：
   - 解压 `生产任务发布单-静态版.zip`
   - 按住 Shift 键，在 `dist` 文件夹空白处点击右键
   - 选择"在此处打开 PowerShell 窗口"（或命令提示符）
   - 输入命令：
     ```bash
     python -m http.server 8080
     ```
   - 打开浏览器，访问：http://localhost:8080

## 常见问题解决

1. 如果双击打开显示空白：
   - 改用方法二
   - 或者安装其他浏览器（推荐 Chrome）

2. 如果提示"python 不是内部或外部命令"：
   - 重新安装 Python，并确保勾选"Add Python to PATH"
   - 或者使用完整的 Python 路径，例如：
     ```bash
     C:\Python39\python -m http.server 8080
     ```

3. 如果端口 8080 被占用：
   - 换一个端口号，例如：
     ```bash
     python -m http.server 8081
     ```
   - 然后访问 http://localhost:8081

4. 如果想保存之前的数据：
   - 在原电脑上使用打印功能，打印当前的任务列表
   - 或者在新电脑上手动重新录入

## 快捷操作说明

1. 创建桌面快捷方式：
   - 在记事本中输入以下内容：
     ```
     @echo off
     cd /d %~dp0dist
     start http://localhost:8080
     python -m http.server 8080
     ```
   - 保存为 `启动程序.bat`
   - 把这个文件放在解压后的文件夹中
   - 双击即可运行

2. 关闭程序：
   - 直接关闭命令提示符窗口即可
   - 或者在命令提示符中按 Ctrl + C

## 注意事项

1. 数据存储：
   - 所有数据保存在浏览器中
   - 不同浏览器之间数据不互通
   - 清除浏览器数据会导致任务记录丢失

2. 建议：
   - 固定使用同一个浏览器
   - 定期使用打印功能备份数据
   - 不要清除浏览器数据 