# Making-ES6
> 为了更好的理解Vue框架，这里开始对ES6进行一个简单的了解
### 关于ES6标准入门
> 刚开始用vue或者react，很多时候我们都会把ES6这个大兄弟加入我们的技术栈中。但是ES6那么多那么多特性，我们需要全部都掌握吗？秉着二八原则，掌握好常用的，有用的这个可以让我们快速起飞。

---
> ES6 就是ECMAScript 6是新版本JavaScript语言的标准。虽然目前已经更新到ES7,但是很多浏览器还不知处ES7语法，该标准仍在更新中，但目前部门网站都指出ES6的语法。目前ES6也是使用最多的最新的javaScript语言标准。要查看ES6的支持情况请点此。

> 在2009年ES5问世以后，javaScript的标准就一直没有更新。从那时起ES标准委员会就已经开始筹划新的ES标准，在2015年发布了ES6。ES6是ECMAScript 的第6个版本。

> 经过持续几年的磨砺,它已成为 JS 有史以来最实质的升级,特性涵盖范围甚广, 小到受欢迎的语法糖,例如箭头函数(arrow functions)和简单的字符串插值(string interpolation),大到烧脑的新概念,例如代理(proxies)和生成器(generators) 。ES6将彻底改变程序员们编写JS代码的方式。

### 测试代码使用方法
> 测试新特性代码较多，基本都进行了分组的处理。

- 例如方法：每空一行是一个方法的测试代码，请认真阅读注释，之后注释掉其他测试代码单独运行该方法的测试代码，在浏览器查看效果
    ```
    //我们可以查看到字符串的很多方法
        console.log(String.prototype);
        //ES6常用新方法：
        // 1.includes 返回值是Boolean类型 true/false
        //判断字符串中有没有指定字符
        //includes("指定字符","开始查找的位置(可选)")
        //第二个参数转换的方法我们可以发现是用的 Number方法
        let str = "abcdefg12345";
        console.log(str.includes("a"));//true
        console.log(str.includes("a", 2));//false 从索引2开始也就是第三个后查找"a"，是不存在的
        console.log(str.includes("g", "2"));//true 第二个参数即使不是数字也会默认转为数字
        console.log(str.includes("a", null));//true null默认转为0

        //2.startsWith endsWith
        //startsWith判断字符串是不是以指定字符作为开头
        //startsWith("指定字符"，开始查找的位置(可选))
        //endsWith判断字符串是不是以指定字符作为结尾
        //endsWith("指定字符"，num(可选))  这里的num指的是：从前num个查看
        console.log(str.startsWith("a"));//true
        console.log(str.startsWith("a", 3));//false 索引3处应该是以d开头

        console.log(str.endsWith("c"));//false
        console.log(str.endsWith("c", 3));//true 前三个字符的结尾是c
    ```
- 例如特性：没有专门分组，请按照注释理解，如果控制台输出内容过多，可以选择注释其他部分，但是请别忽视代码的依赖造成内容的错误
- 例如JS文件：建议使用Webstrom直接在控制台输出查看效果

> 部分测试代码运行结果可能与注释发生了冲突，错误原因基本是前后代码的运行对数组或者对象进行修改造成的，注释其他部分只运行该段即可
