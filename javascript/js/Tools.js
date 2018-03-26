/**
 * @description 事件绑定，兼容各浏览器
 * @param target 事件触发对象
 * @param type 事件
 * @param func 事件处理函数
 */

function addEvent(target, type, func){
	if(target.addEventListener){ // 非IE 和 IE9
		target.addEventListener(type, func, false);
	}else if(target.attachEvent){ // ie6 到 IE8
		target.attachEvent("on"+ type, func);
	}else{
		target["on" + type] = func; // ie5
	}
}

/**
 * @description 事件绑定，兼容各浏览器
 * @param target 事件触发对象
 * @param type 事件
 * @param func 事件处理函数
 */

 function removeEvent(target,type,func){
 	if(target.removeEventListener){
 		target.removeEventListener(type,func,false);
 	}else if(target,detachEvent){
 		target.detachEvent("on" + type , func);
 	}else{
 		target["on" + type] = null;
 	}
 }


 /**
  * @description  获取鼠标在页面上的位置
  */
 function getPage(e){
 	return {
 		pageX: e.clientX + getScroll().left;
 		pageY: e.clientY + getScroll().top;
 	}
 }
 /**
  * @description 获取页面滚动的距离（兼容写法）;
  */
 function getScroll(){
 	return {
 		left: document.documentElement.scrollLeft || document.body.scrollLeft;
 		top: document.documentElement.scrollTop || document.body.scrollTop;
 	}
 }


// 放大图特效 js公式
// mask移动的距离 / 大图片移动的距离 = mask移动的最大距离 / 大图片移动的最大距离
// ==》  大图片移动的距离 = mask移动的距离 * 大图片移动的最大距离 / mask移动的最大距离
// 
// 
// 模拟滚动条特效 js公式
// 视图盒子的高 / 内容盒子的高 = 滚动条的高 / 滚动条滑块的高
// ==》  滚动条滑块的高 = 视图盒子的高 / 内容盒子的高 * 滚动条的高
// 



// 运动函数
function css(obj, attr, value)
{
	if(arguments.length==2)
		return parseFloat(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]);
	else if(arguments.length==3)
		switch(attr)
		{
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
				value=Math.max(value,0);
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				obj.style[attr]=value+'px';
				break;
			case 'opacity':
				obj.style.filter="alpha(opacity:"+value*100+")";
				obj.style.opacity=value;
				break;
			default:
				obj.style[attr]=value;
		}
	
	return function (attr_in, value_in){css(obj, attr_in, value_in)};
}

var MOVE_TYPE={
	BUFFER: 1,
	FLEX: 2
};

function StartMove(obj, oTarget, iType, fnCallBack, fnDuring)
{
	var fnMove=null;
	if(obj.timer)
	{
		clearInterval(obj.timer);
	}
	
	switch(iType)
	{
		case MOVE_TYPE.BUFFER:
			fnMove=DoMoveBuffer;
			break;
		case MOVE_TYPE.FLEX:
			fnMove=DoMoveFlex;
			break;
	}
	
	obj.timer=setInterval(function (){
		fnMove(obj, oTarget, fnCallBack, fnDuring);
	}, 15);
}

function DoMoveBuffer(obj, oTarget, fnCallBack, fnDuring)
{
	var bStop=true;
	var attr='';
	var speed=0;
	var cur=0;
	
	for(attr in oTarget)
	{
		cur=css(obj, attr);
		if(oTarget[attr]!=cur)
		{
			bStop=false;
			
			speed=(oTarget[attr]-cur)/5;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			css(obj, attr, cur+speed);
		}
	}
	
	if(fnDuring)fnDuring.call(obj);
	
	if(bStop)
	{
		clearInterval(obj.timer);
		obj.timer=null;
		
		if(fnCallBack)fnCallBack.call(obj);
	}
}

function DoMoveFlex(obj, oTarget, fnCallBack, fnDuring)
{
	var bStop=true;
	var attr='';
	var speed=0;
	var cur=0;
	
	for(attr in oTarget)
	{
		if(!obj.oSpeed)obj.oSpeed={};
		if(!obj.oSpeed[attr])obj.oSpeed[attr]=0;
		cur=css(obj, attr);
		if(Math.abs(oTarget[attr]-cur)>1 || Math.abs(obj.oSpeed[attr])>1)
		{
			bStop=false;
			
			obj.oSpeed[attr]+=(oTarget[attr]-cur)/5;
			obj.oSpeed[attr]*=0.7;
			var maxSpeed=65;
			if(Math.abs(obj.oSpeed[attr])>maxSpeed)
			{
				obj.oSpeed[attr]=obj.oSpeed[attr]>0?maxSpeed:-maxSpeed;
			}
			
			css(obj, attr, cur+obj.oSpeed[attr]);
		}
	}
	
	if(fnDuring)fnDuring.call(obj);
	
	if(bStop)
	{
		clearInterval(obj.timer);
		obj.timer=null;
		if(fnCallBack)fnCallBack.call(obj);
	}
}