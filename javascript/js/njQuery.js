(function (window,undefined) {
    function njQuery(selector) {
        return new njQuery.prototype.init(selector);
    }

    njQuery.prototype = {
        constructor : njQuery,

        init: function (selector) {
            selector = njQuery.trim(selector);
            // 传入 '', null, undefined, NaN, 0 ,false 返回空的jQuery 对象
            if(!selector) {
                return this;
            }else if(njQuery.isFunction(selector)){
                njQuery.ready(selector);
            }else if(njQuery.isString(selector)){
                // 判断是否为代码片段
                if(njQuery.isHtml(selector)){
                    // 创建DOM节点
                    var temp = document.createElement('div');
                    temp.innerHTML = selector;
                    /**
                     *  将DOM节点添加到init对象中
                         for(var i = 0; i < temp.children.length; i++){
                            this[i] = temp.children[i];
                            this.length = temp.children.length;
                        }
                     */
                    /**
                     * 将伪数组转换为真数组
                     * [].slice.call(obj); 返回一个真数组
                     *
                     * 将真数组转换为伪数组
                     * [].push.apply(this,arr) // 返回一个伪数组
                     */

                    [].push.apply(this, temp.children);
                    return this;

                // 判断是否为选择器
                }else{
                    var aEls = document.querySelectorAll(selector);
                    [].push.apply(this,aEls);

                    return this;
                }
            // 数组
            }else if(njQuery.isArray(selector)){
                if(({}).toString.apply(selector) == '[object Array]'){
                    // 真数组
                    [].push.apply(this,selector);
                    return this;
                }else{
                    // 伪数组
                    // 将自定义的伪数组转为真数组
                    var arr = [].slice.call(this, selector);
                    // 将真数组转换为伪数组
                    [].push.apply(this,selector);
                    return this;
                }
            }else{
                this[0] = selector;
                this.length = 1;
                return this;
            }
        },

        njquery: '1.0.0',
        selector: '',
        length: 0,
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        toArray: function () {
            [].slice.call(this);
        },
        get: function (num) {
            if(arguments.length === 0){
                return this.toArray();
            }else if(num >= 0){
                return this[num];
            }else{
                return this[this.length + num];
            }
        },
        eq: function (num) {
            if(arguments.length === 0){
                return new njQuery();
            }else{
                return njQuery(this.get(num));
            }
        },
        first:function () {
            return this.eq(0);
        },
        last:function () {
            return this.eq(-1);
        },
        each: function (fn) {
            njQuery.each(this, fn);
        },
        map: function (obj,fn) {
            var result = [];
            if(njQuery.isArray(obj)){
                for(var i = 0; i < obj.length;){
                    var temp = fn(obj[i], i);
                    if(temp){
                        result.push(temp)
                    }
                }
            }else if(njQuery.isObject(obj)){
                for(var key in obj){
                    var temp = fn(obj[key], key);
                    if(temp){
                        result.push(temp)
                    }
                }
            }

            return result;
        }
    }

    njQuery.extend = njQuery.prototype.extend = function (obj) {
        for(var key in obj){
            this[key] = obj[key];
        }
    }

    njQuery.extend({
        isString : function (str) { return typeof str === 'string'; },

        isHtml : function (html) {  return html.charAt(0) == '<' && html.charAt(html.length -1) == '>' && html.length >= 3 },

        trim : function (str) {
            if(!njQuery.isString(str)){
                return str;
            }
            if(str.trim){
                return str.trim();
            }else{
                return str.replace(/^\s+|\s+$/g,'');
            }
        },
        isWindow : function (sele) {return sele == window;},

        isObject : function (sele) {return typeof sele === 'object';},

        isArray : function (sele) {
            if(njQuery.isObject(sele) && !njQuery.isWindow(sele) && sele in "length"){
                return true;
            }else{
                return false;
            }
        },

        isFunction : function (sele) {
            return typeof sele === 'function';
        },

        ready: function (fn) {
            // 判断DOM是否加载完成
            if(document.readyState == 'complete'){
                fn();
            }else if(document.addEventListener){
                document.addEventListener('DOMContentLoaded',function () {
                    fn();
                })
            }else{
                document.attachEvent('onreadystatechange',function () {
                    if(document.readyState == 'complete'){
                        fn();
                    }
                })
            }
        },

        each: function (obj,fn) {
            // 如果是数组
            if(njQuery.isArray(obj)){
                for(var i = 0; i < obj.length;){
                    var res = fn.call(obj[i], i,obj[i]);
                    if(res === true){
                        continue;
                    }else if(res === false){
                        break;
                    }
                }
            }
            // 如果是对象
            else if(njQuery.isObject(obj)){
                for(var key in obj){
                    var res = fn.call(obj[key],key,obj[key]);
                    if(res === true){
                        continue;
                    }else if(res === false){
                        break;
                    }
                }
            }
        }

    });

    njQuery.prototype.extend({
        empty: function () {
            this.each(function (key,value) {
                value.innerHTML = '';
            })
            // 返回当前对象 方便链式调用
            return this;
        },
        remove: function (sele) {
            if(arguments.length == 0){
                this.each(function (key,value) {
                    var eleVal = value.parentNode
                    eleVal.removeChild(value);
                })
                // 返回当前对象 方便链式调用
                return this;
            }else{
                $this = this;
                // 根据传入的选择器找到对应的元素
                njQuery(sele).each(function (key,value) {
                    // 遍历找到的元素，获取对应的类型
                    var type = value.tagName;
                    // 遍历指定元素的类型
                    $this.each(function (k,v) {
                        var t = v.tagName;
                        if(t == type){
                            var eleVal = value.parentNode
                            eleVal.removeChild(value);
                        }
                    })
                    
                })
            }
        },
        html: function (content) {
            if(arguments.length == 0){
                return this[0];
            }else{
                this.each(function (key, value) {
                    value.innerHTML = content;
                })
            }

        },
        text: function (content) {
            if(arguments.length === 0){
                var res = '';
                this.each(function (key,value) {
                    res += value.innerText;
                })
                return res;
            }else{
                this.each(function (key,value) {
                    value.innerText = content;
                })
            }
        },
        appendTo: function (sele) {
            var Target = njQuery(sele);
            var _this = this;
            var res = [];
            // 遍历取出所有指定的元素
            njQuery.each(Target,function (key,value) {
                // 遍历取出所有的元素
                njQuery.each(_this,function (k,v) {
                    // 判断当前是否为第一个
                    if(k == 0){
                        // 直接添加
                        value.appendChild(v);
                        res.push(v);
                    }else{
                        // 先拷贝再添加
                        var cloneEle = v.cloneNode(true);
                        value.appendChild(cloneEle);
                        res.push(cloneEle);
                    }
                })
            })

            njQuery(res);
        },
        prependTo: function (sele) {
            var Target = njQuery(sele);
            var _this = this;
            var res = [];
            // 遍历取出所有指定的元素
            njQuery.each(Target,function (key,value) {
                // 遍历取出所有的元素
                njQuery.each(_this,function (k,v) {
                    // 判断当前是否为第一个
                    if(k == 0){
                        // 直接添加
                        value.insertBefore(v,value.firstChild);
                        res.push(v);
                    }else{
                        // 先拷贝再添加
                        var cloneEle = v.cloneNode(true);
                        value.insertBefore(cloneEle,value.firstChild);
                        res.push(cloneEle);
                    }
                })
            })

            njQuery(res);
        }
    });

    njQuery.prototype.init.prototype = njQuery.prototype;

    window.njQuery = njQuery;

})(window);