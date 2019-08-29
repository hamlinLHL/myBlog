---
title: 让你的项目使用Ts吧
date: 2019-8-29
categories: 
- frontend
tags:
- ts
---
# 9012年都过半了，还不会用ts你就out了
## why ?
1. 三大框架angular2以后的版本完全是用ts开发的， 
2. vue对ts的支持也越来越好，
3. React也有TSX组件
## 还在犹豫什么
## 本文不涉及框架内容，因为框架的cli已经帮你搭好了ts环境。。。
## 本文只教你如何在一个demo里搭建Ts环境，好了，我们开始吧
#  第一步，安装
全局安装typescript
```
npm install typescript -g
```
安装好以后，在你的项目里就可以使用tsc 命令了</br>
```
tsc [ts文件名] 
```
使用上面的命令就可以把某个ts文件编译成js文件
```
tsc  
```
这是编译所有ts文件
# 第二步， 配置文件
恭喜你，走完第一步你已经成功一大半了！</br>
新建一个json类型的配置文件， 文件名是tsconfig.json。
```js{2}
{
  "compilerOptions": { // 编译选项
    "target": "es2016",  // 配置编译目标代码的版本标准
    "module": "commonjs",  // 配置编译目标使用的模块化标准
    "lib": ["es2016"]  
  }
}
```
最简单的配置是这样,后面可以根据需求加上你需要的配置。</br>
:::tip
注意！！！加入配置文件后，使用tsc 命令编译某个ts文件时不需要带上.ts文件后缀, 否则会忽略配置文件
:::

## 插播一条重要内容

我们的ts项目如果使用了第三方库，比如lodash,mock，jquery什么的,这些第三方库并不是用ts写的，</br>
它们是用js写的，没有ts的类型检查， 怎么办？</br>
有办法，官方有一个@types的类型库，它包含了很多对js代码的类型描述</br>
比如你想用jquery, 你就可以安装@types/jquery。

## ts和js分开
开发过程中我们肯定希望源代码和编译后的代码分开，加入以下两个配置选项</br>
include : 需要编译的文件目录</br>
outDir: 编译后的文件目录</br>
```js{2}
{
  "compilerOptions": { // 编译选项
    "target": "es2016",  // 配置编译目标代码的版本标准
    "module": "commonjs",  // 配置编译目标使用的模块化标准
    "lib": ["es2016","dom"], // 配置环境
    "outDir": "./dist"
  },
  "include": ["./src"]
}
```
# 第三步 简化开发流程
如果你只是想用ts写个hello world， 你已经可以做到了</br>
假设你有个hello.ts文件，文件内容是console.log('hello world');
命令行依次执行：
```
tsc

node ./dist/hello.js 
```
命令行就可以打印出 hello world</br>
截至第二步， 每次修改文件你都要执行两步：</br>
1. 编译文件 tsc
2. 执行文件 node ./dist/文件名</br>
我们可以使用第三方库来简化这个流程</br>
## ts-node
安装 npm install ts-node -D</br>
命令行执行 
```
ts-node /src/hello.ts
```
它可以在内存中直接编译ts并执行编译后的文件（不会生成dist目录）
这样还不够好，虽然它可以帮我们编译并执行，但是它不能检测代码的变化</br>

## nodemon
安装 npm install nodemon -D</br>
命令行执行 
```
nodemon --exec --watch src -e ts ts-node /src/hello.ts
```
--watch src表示只监控src文件夹下的文件</br>
-e ts表示只监控ts文件的改变</br>
这样你随便改hello.ts的内容它都会自动编译并运行。
最后把这条命令写在package.json的script里，完美收官！

# 结语
至此相信你对ts已经不那么陌生了，下篇和大家一起结合React和Ts开发个小demo,</br>
帮你熟悉项目实战。
