
	/*
	 *	obj 得到属性值的元素
	 *	attr 得到属性值
	 */
	function getStyleAttr(obj,attr){
		if(window.getComputedStyle){
			return getComputedStyle(obj,null)[attr];
		}
		return obj.currentStyle[attr];
	}
	/*
	 * obj 元素
	 * attr 属性
	 * target 目标值
	 * fn 回调函数
	 */
	
	function startMove(obj,attr,target,fn){
		//console.log("a");		
		//清除定时器
		clearInterval(obj.timer);
		//开启定时器
		obj.timer = setInterval(function(){
			//1.获取当前值
			var current = 0;
			if(attr == "opacity"){
				current = parseFloat(getStyleAttr(obj,attr)*100);
				current = Math.round(current);
			}else{
				current = parseFloat(getStyleAttr(obj,attr));
				current = Math.round(current);
			}
			//2.设定速度
			var speed = (target - current)/8;
			speed = speed>0 ? Math.ceil(speed):Math.floor(speed);
			//console.log(speed);
			//3.临界值
			if(current == target){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
				return;
			}
			//4.运动
			if(attr == "opacity"){
				obj.style.opacity = (current + speed)/100;
				obj.style.filter = "alpha(opacity="+(current+speed)+")";
			}else{
				obj.style[attr] = current + speed + "px";
			}
		},30)
	}