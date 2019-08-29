---
title: es6之ArrayBuffer
date: 2019-8-23
categories: 
 - frontend
tags:
- es6
- ArrayBuffer
---
# 由来
## js操作二进制数据三兄弟
ArrayBuffer对象， TypeArray视图和DataView视图</br>
它们都以数组的语法处理二进制数据，所以统称为二进制数组</br>
::: tip
二进制数组并不是真正的数组，而是类似数组的对象
:::
## 设计的目的
与WebGL项目有关，WebGL是浏览器和显卡之间的通信接口，</br>
利用二进制数据通信可以大大提升脚本性能</br>
## 概念
+ ArrayBuffer： 原始的二进制数据
+ TypeArray： 用于读写简单类型的二进制数据
+ DataView： 用于读写复杂类型的二进制数据
+ TypeArray支持的数据类型

| 数据类型        | 字节长度| 含义                            |
| ----------------|:-------:|:-------------------------------:|
| Int8            | 1       | 8 位带符号整数                  |
| Uint8           | 1       | 8 位不带符号整数                |
| Uint8C          | 1       | 8 位不带符号整数（自动过滤溢出）|
| Int16           | 2       | 16 位带符号整数                 |
| Uint16          | 2       | 16 位不带符号整数               |
| Int32           | 4       | 32 位带符号整数                 |
| Uint32          | 4       | 32 位不带符号的整数             |
| Float32         | 4       | 32 位浮点数数                   |
| Float64         | 8       | 64 位浮点数（自动过滤溢出）     |

# 用途

## 在浏览器中
以下几个AIP用到了二进制数组操作二进制数据
+ File API
    + fileReader可以使用readAsArrayBuffer(file)读取文件
+ XMLHttpRequest
    + ajax的返回值可以是ArrayBuffer对象
+ Fetch API
    + fetch取回的数据就是ArrayBuffer对象
+ Canvas
    ```js{1}
      const canvas = document.getElementById('myCanvas');
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const uint8ClampedArray = imageData.data;
    ```
    + 上面取到的是 一种针对canvas元素的专有类型Unit8ClampedArray。
    + 这个视图类型专门针对颜色，把每个字节解读为无符号8位整数，只能取值0 - 255
    
+ WebSockets
    + 通过ArrayBuffer 发送或者接收二进制数据
    ```js{1}
    let socket = new WebSocket('ws://127.0.0.1:8081');
    socket.binaryType = 'arraybuffer';
    // Wait until socket is open
    socket.addEventListener('open', function (event) {
    // Send binary data
    const typedArray = new Uint8Array(4);
    socket.send(typedArray.buffer);
    });
    // Receive binary data
    socket.addEventListener('message', function (event) {
    const arrayBuffer = event.data;
    // ···
    });
    ```
    
---------------------------------------------------------------------

## ArrayBuffer 的api<Badge text="stable"/>
```js{8}
/**
 * 生成了一段32字节的内存区域，
 * 每个字节的默认值都是0
 * 不能直接读写
 * 只能通过视图读写
 * @type {ArrayBuffer}
 */
const arrbuffer = new ArrayBuffer(32)
```
### 返回所分配的内存区域的字节长度
```js{1}
ArrayBuffer.prototype.byteLength
```
### 允许将内存区域的一部分复制生成一个新的ArrayBuffer对象
```js{1}
ArrayBuffer.prototype.slice()
```
<strong>用DataView视图读取</strong>
```js{8}
/**
 * 为ArrayBuffer创建视图
 * 以便读取
 * @type {DataView}
 */
const dataView = new DataView(arrbuffer)

/**
 * 以无符号8位整数格式读取第一个元素
 */
dataView.getUint8(0)  // 0
```
<strong>用TypeArray视图读取</strong></br>
[上表中](#概念)每一种数据类型对应一个构造函数
### 返回整段内存区域对应的ArrayBuffer对象，只读
```js{1}
TypeArray.prototype.buffer
```
### 返回TypeArray数组占据的内存长度，单位位字节， 只读
```js{1}
TypeArray.prototype.byteLength
```
### 用于整段的复制，复制a的内容到b
```js{1}
// TypeArray.prototype.set()
const a  = new Uint8Array(8);
const b = new Uint8Array(8);
b.set(a);
```
:::tip
普通数组的操作方法和属性对TypeArray 数组完全适用
:::
