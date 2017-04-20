

	//获取某元素的某属性值
	/*
	 * 	obj 需要获取属性值的元素节点，如box
	 *	attr 需要获取的属性，如left 
	 * 
	 */

	function getStyleAttr(obj,attr){
		
		if(window.getComputedStyle){
			return getComputedStyle(obj,null)[attr];
		}
		return obj.currentStyle[attr];
	}
	
	//封装move
	/*
	 * 	obj 需要运动的元素
	 * 	attr 需要改变的属性
	 * 	target 目标值
	 * 	fn回调函数
	 * 
	 */
	function move(obj,attr,target,fn){
		console.log("aa");
		//清除之前的定时器
		clearInterval(obj.timer);
		//再开启新的定时器
		obj.timer = setInterval(function(){
			//1.获取当前的值
			var current = 0;
			if(attr = "opacity"){  //透明度
				current = parseFloat(getStyleAttr(obj,attr)*100);
				current = Math.round(current);
			}else{
				//left/top/width/height
				current = parseFloat(getStyleAttr(obj,attr));
				current = Math.round(current); //四舍五入
			}
			//2.给一个速度
			var speed = (target - current)/10;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			
			//3.判断是否达到目标值
			if(current == target){
				clearInerval(obj.timer);
				
				//回调
				if(fn){
					fn();
				}
				return;
			}
			//4.运动
			if(attr == "opacity"){
				obj.style.opacity = (current + speed)/100;
				obj.style.filter ="alpha(opacity=" + current+speed + ")"; 
			}else{
				obj.style[attr] = current + speed + "px";
			}
		},100)
	}
