## 初始化项目

安装express生成器 
``` sh
npm install express-generator -g // 当前express-generator的版本是4.16.0
```

通过express命令初始化项目
``` sh
express -h //查看帮助
express -e -c sass api-server // 使用ejs作为html模板引擎，sass作为css框架
cd api-server
npm i // 安装依赖文件
DEBUG=test:* npm start // 本地启动项目
```

初始化git本地库，并且关联至github远程库
```
git init
git remote add origin git@github.com:xiangrenya/api-server.git
```
