# 分类：
+ 基本(值)类型
    1. Number : 任意数字
	2. String : 任意字符串
	3. Boolean : truen / false
    4. Null	: null
    5. undefined : undefined
+ 对象(引用)类型
	1. Object : 任意对象
	2. Array : 数组对象
	3. Function : 一种可执行对象

# 判断：
* typeof
	1. 可判断： 数值 / 字符串 / 布尔值 / function
	2. 不可判断 null与object  object与array
* instanceof 
	1. 可判断对象的具体类型
* ===
	1. 可判断： undefined / null

> # 问题 
  1. undefined与null的区别？
	* undefined 代表定义为赋值
	* unll 代表定义并且赋值了，只是值是null
  2. 什么时候给变量赋值为null ？
	* 初始赋值，表明将要复制为对象
	* 结束前，让对象成为垃圾对象（被垃圾对象回收器回收）
  3. 严格区分变量类型与数据类型？
	* 数据类型
		* 基本类型
		* 对象类型
	* 变量类型 （变量内存的类型）
		* 基本类型 （保存就是基本类型的数据）
		* 引用类型（ 保存的是地址值）

# 关于引用变量赋值问题
	* 2个引用变量指向同一个对象，通过一个变量修改内部数据，另一个变量看到的是修改后的数据
	* 2个引用变量指向同一个对象，让其其中一个引用变量指向另一个对象，另一个引用变量依然指向前一个对象

> 问题： js引擎如何管理内存？
	1. 内存生命周期
		* 分配小内存，得到它的使用权使用权
		* 存储数据，可以反复执行操作
		* 释放小内存空间
	2. 释放内存
		* 局部变量： 函数执行完自动释放
		* 对象： 成为垃圾对象==> 垃圾回收器回收

# 对象
1. 什么是对象？
	* 多个数据的封装
	* 用来保存多个数据的容器
	* 一个对象代表现实中的一个事物
2. 为什么要用对象？
	* 统一管理多个数据
3. 对象的组成？
	* 属性：属性名(字符串)： 属性值(任意类型)  如 value : key
	* 方法：一种特别的属性(属性值是函数)
4. 如何访问对象内部数据？
	* .属性 (有局限性)
	* ['属性名'] （通用）属性名不缺定、属性名包含特殊字符空格或中划线

# 函数
1. 什么是函数
	* 实现功能的n条语句的封装
	* 只有函数是可执行的，其他类型数据不能执行
2. 为什么要用函数
	* 提高代码的重用性
	* 便于阅读
3. 如何定义函数
	* 函数声明
	* 表达式
4. 如何调用(执行)函数
	* 直接调用 函数名();
	* 通过对象调用 obj.属性名()
	* new 函数名() 调用
	* 函数名.call()/apply(obj) ： 临时让当前函数成为obj的方法及进行调用
5. 匿名函数自调用
	全称： Immediately-Invoked Function Expression (IIFE)
	1. 作用
	* 隐藏实现
	* 不会污染外(全局)命名空间
	<pre>
		<code>
			(function(){

			})()
		</code>
	</pre>

# this
1. this是什么
	* 任何函数本质都是通过某个对象来调用的
	* 所有函数内部都有一个变量this
	* 它的值是调用函数的当前对象
2. 如何确定this的值？
	* 函数名()  ==>  window
	* 对象.函数名 ===> 对象
	* new 函数名() ==> 新创建的对象
	* 函数名.call(对象) ===> 对象

# 原型
1. 每个函数function都有一个prototype 即显式原型(属性)
2. 每个实例对象都有一个__proto__ 可称为隐式原型(属性)
3. 对象的隐式原型的值为其对应的构造函数的显示原型的值
4. 总结：
	* 函数的prototype属性：在定义函数时自动添加的，默认值是一个空object对象
	* 对象的__proto__属性： 创建对象时自动添加的，默认值为构造函数的prototyoe属性的值
	* 开发者只能直接操作显示原型，但不能直接操作隐式原型(ES6之前)

# 原型链
1. 访问原型链时， 先自身属性中查找，找到则返回，如果没有则沿着__proto__这条链向上查找，找到返回 如果没找到则返回undefined
2. 构造函数/原型/实体对象关系
3. 读取对象的属性值时： 会自动原型链中查找
4. 设置对象的属性值时： 不会查找原型链，如果当前对象中没有此属性，直接添加此属性并设置其值
5. 方法一般定义在原型中，属性一般通过构造函数定义在对象本身上

# 闭包
1. 如何产生闭包
	* 当一个嵌套的内部(子)函数引用了嵌套的外部(父)函数的变量(函数)时，就产生了闭包
2. 闭包到底是什么
	* 使用chrome调试查看
	* 理解一：闭包是嵌套的内部函数
	* 理解二： 闭包被引用变量(函数)的对象
	* 闭包存在于嵌套的内部函数中
3. 产生闭包的条件
	* 函数嵌套
	* 内部函数引用了外部函数的数据(变量/函数)
4. 闭包的作用
	* 使用函数内部的变量在函数执行完后，仍然存活在内存中（延长了局部变量的生命周期）
	* 让函数外部可以操作（读写）到函数内部的数据(变量/函数)

# 闭包的应用
	* 具有特定的功能的js文件
	* 将所有数据和功能都封装在一个函数内部（私有）
	* 只向外部暴露n个方法的对象或函数
	* 模块的使用者，只需要通过模块暴露的对象调用方法来实现对应的功能

## 内存溢出与内存泄漏
1. 内存溢出
	* 一种程序运行出现的错误
	* 当程序运行的内存超过了剩余的内存时，就抛出内存溢出的错误
2. 内存泄漏
	* 占用的内存没有及时释放
	* 内存泄漏累积多了就容易导致内存以溢出
	* 常见的内存泄漏：
		* 意外的全局变量
		* 没有及时清理的计时器或回调函数 
		* 闭包

# 类的继承(组合)
```
	function Person(name,age){
		this.name = name;
		this.age = age;
	}
	
	Person.prototype.setName = function(){
		this.name = name;
	}

	function Student(name,age,price){
		person.call(this,name,age);
		this.price = price;
	}

	Student.prototype = new Person;
	Student.prototype.constructor = Student;
	Student.prototype.setPrice = function(){
		this.price = price;
	}

```
* 原型链继承:(得到方法)
``` 
	function Parent(){
		Parent.prototype.test = function(){}
	}
	function Child(){}
	Child.prototype = new Parent();
	Child.prototype.constructor = Child;
	var child = new Child(); // 有test()方法
```
* 借用构造函数:(得到属性）
```
	function Parent(xxx){this.xxx = xxx}
	Parent.prototype.test = function(){};
	function Child(xxx,yyy){
		Perent.call(this,xxx);// 借用构造函数
	}

	var child = new Child('a','b'); child.xxx a为xxx  但child 没有test()方法
```
* 组合(得到属性和方法)
```
function Parent(xxx){
	this.xxx = xxx;
}
Parent.prototype.test = function(){}

function Child(xxx,yyy){
	Parent.call(this,xxx); // this.Parent(xxx)
	this.yyy = yyy;
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;
Child.prototype.test2 = function(){}
```

1. new 一个对象背后所做的事：
	* 创建了一个空对象
	* 给对象设置了__proto__,值为构造函数对象的prototype的属性值
	* 执行构造函数体（给对象添加属性/方法）

```
// 1 1 2 3 5 8   f(n) = f(n-1) + f(n-2)
 function fibonacci(n){
 	return n<=2? 1: fibonacci(n-1) + fibonacci(n-2) // 递归
 }
```