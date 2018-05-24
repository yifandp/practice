# PHP
### 数据类型
1. 在PHP中将数据分为三大类 八小类
* 简单（基本）数据类型： 4个小类
* 整型：int/integer 系统分配4个字节存储，表示整数类型（有前提）
* 浮点型：float/double, 系统分配8个字节存储，表示小数或者整型存不下的整数
* 字符串型：string，系统根据实际长度分配，表示字符串（引号）
* 布尔类型：bool/boolean ，表示布尔类型 只有两个值：true/false;

2. 复合数据类型 ：2个小类
* 对象类型： object 存放对象（面向对象）
* 数组类型： array 存储对个数据（一次性）

3. 特殊数据类型： 2个小类
* 资源类型： resource, 存放资源数据（PHP外部数据，如数据库、文件）
* 空类型：NULL ，只有一个值就是 NULL（不能运算）

---

### 类型转换

类型转换： 在很多条件下，需要指定的数据类型，需要外部数据（当前php 取得数据）转换成目标数据类型
* 在PHP中有两种类型转换方式
1. 自动转换： 系统根据需求自己判定，自己转换（用的比较多 效率偏低）
2. 强制转换（手动） 强制转换规则：在变量之前增加一个括号(),然后在里面写上对应的数据类型 int/integer... 其中NULL类型用到 unset(); 
转换过程中 布尔类型（判断）和数值类型（运算）用比较多 

其他类型转换数值说明：
1. 布尔true 转换为1，false为0;
2. 字符串转换数值有自己的规则
  * 2.1 以字母开头的字符串，永远为0
  * 2.2 数字开头的字符串，取到碰到到字符串为止（不会同时包含两个小数点） 

***

### 类型判断

* 通过一组类型判断函数，来判断变量，最终返回这个变量所保存的数据类型（相同结果返回true，失败为false）
  是一组以is_开头后面跟类型名字的函数： is_XXX（变量名）
  Bool类型不能用echo 查看 应该用var_dump() 查看
* 还有一组函数可以用来获取以及设定数据（变量）的类型Gettype(变量名): 获取类型 得到的是该类型对应的字符串
