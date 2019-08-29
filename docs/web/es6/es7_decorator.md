---
title: es7之修饰器  
date: 2019-8-17
categories: 
- frontend
tags:
- es7
- 修饰器
---
#  什么是修饰器
修饰器其实就是一个普通的函数，用来修饰类以及类的方法。
比如:
```js{5}
@test
class DecoratorTest {

}
function test(target) {
    target.testable = true;
}
```
target 参数就是它修饰的类 </br>
这就表示给DecoratorTest这个类加上了一个静态属性 testable,等价于:
```
class DecoratorTest {
    public static testable = true;
}
```
如果你觉得一个参数不够用, 可以在外面再套一层函数用来传递参数</br>
就像这样 ：
```js{5}
@testParam(true)
class DecoratorTest {

}
function testParam(boolean bool) {
    return function test(target) {
               target.testable = bool;
           }
}
```
这样就更灵活些了。</br>
刚才我们是用修饰器给类加了一个静态属性， 同理加实例属性只需要在类的原型上给它加个属性就行了
```js{5}
@testParam(true)
class DecoratorTest {

}
function testParam(boolean bool) {
    return function test(target) {
               target.prototype.testable = bool;
           }
}
```
::: warning
修饰器对类行为的改变发生在代码编译阶段，而不是运行阶段
:::
# 可以用在哪
修饰器不仅可以修饰类， 还可以修饰类中的属性和方法
修饰什么就放在什么前面，

修饰类中属性和方法时，修饰器函数接受三个参数
```js{1}
function readonly(target, name, descriptor) {
    descriptor.writable = false;
    return descriptor;
}
```
target 是目标对象， name是修饰的属性名， descriptor是该属性的描述对象</br>
descriptor 一般长这样
```js{2}
{
    value : specifiedFunction,
    enumerable: false,
    configurable: true,
    writable: true
}
```
它定义了该属性是否可枚举， 是否可读，是否可配置</br>
上面的readonly修饰器修饰的属性不可写</br>
类似于
```js{5}
Object.defineProperty(target, name, {
                                        value : specifiedFunction,
                                        enumerable: false,
                                        configurable: true,
                                        writable: false
                                    })
```
# 不能用在哪
修饰器在js中不能用来修饰函数， 因为js中函数在预编译阶段存在函数提升


# 第三方库
[core-decorators.js](https://github.com/jayphelps/core-decorators) 
此模块封装了几个常用的修饰器</br>
+ @autobind 使方法中的this 绑定原始对象</br>
+ @readonly 使属性和方法不可写
+ @override 检查子类方法是否正确覆盖了父类的同名方法，如果不正确会报错
+ @deprecated 会在控制台显示一条警告，表示该方法将废除





