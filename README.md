## 技术栈

- express
- mongoose

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

## 代码规范

通过eslint工具，初始化项目的校验规则, 项目的中所有的代码必须遵循`airbnb`定义的规范
``` sh
eslint init // 选择airbnb定义的规范
```
需要安装校验所需的依赖：`eslint、eslint-config-airbnb-base、eslint-plugin-import`

## 项目结构


## 开发过程中遇到的坑
 
### node-sass安装失败
mac或linux系统直接通过一下命令安装
`SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass`
参考资料：[https://github.com/lmk123/blog/issues/28](https://github.com/lmk123/blog/issues/28)

### 异常处理
异常处理中`app.use((err, req, res, next) => {});`中的next参数不能丢，虽然没有用上，但是如果没有这个参数，程序根本捕获不了异常，为了找出这个问题，耗费我太多时间。
