
	
	//获取属性值
	/*
	 *	obj 获取属性值的元素
	 *	attr 获取属性值
	 */
	function getStyleAttr(obj,attr){
		if(window.getComputedStyle){
			return getComputedStyle(obj,null)[attr];
		}
		return currentStyle[attr];
	}
	
	//运动的函数
	/*
	 *	obj 元素
	 * 	attr 属性值
	 *	target 目标值
	 */
	function move(obj,attr,target,fn){
		//清楚定时器
		clearInterval(obj.timer);
		//开启定时器
		obj.timer = setInterval(function(){
			//1.获取当前值
			var current = 0;
			if(attr == "opacity"){
				current = parseFloat(getStyleAttr(obj,attr)*100);
				current = Math.round(current);
			}else{
				current = parseInt(getStyleAttr(obj,attr));
				current = Math.round(current);
			}
			//2.速度
			var speed = (target - current)/10;
			speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);
			//console.log(speed);
			//3.判断临界值
			if(current == target){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
				return;
			}
			//4.运动
			if(attr == "opacity"){
				obj.style[attr] = (current + speed)/100;
			}else{
				obj.style[attr] = current + speed + "px";
			}
		},100)
	}
