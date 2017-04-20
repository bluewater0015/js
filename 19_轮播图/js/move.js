
	
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
	function move(obj,json,fn){  //json相当于attr target
		//清楚定时器
		clearInterval(obj.timer);
		//开启定时器
		obj.timer = setInterval(function(){
			var flag = true;
			for(attr in json){  //遍历对象
				var objAttr = 0;
				if(attr == "opacity"){
					objAttr = parseFloat(getStyleAttr(obj,attr)*100);
					objAttr = Math.round(objAttr);
				}else{
					objAttr = parseInt(getStyleAttr(obj,attr));
					objAttr = Math.round(objAttr);
				}
				//2.速度
				//json[attr] 对象中的属性值 也就是目标值
				var speed = (json[attr] - objAttr)/10;
				speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);
				//console.log(speed);
				//3.判断临界值
				/*if(objAttr == json[attr]){
					clearInterval(obj.timer);
					if(fn){
						fn();
					}
					return;
				}*/
				if(objAttr != json[attr]){  //判断所有的运动都达到目标值
					flag = false;  //如果进入if语句中 则判断至少有一个位达到目标值
				}
				//4.运动
				if(attr == "opacity"){
					obj.style[attr] = (objAttr + speed)/100;
				}else{
					obj.style[attr] = objAttr + speed + "px";
				}
			}
			if(flag){  //再次判断flag值
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}
		},1000)
	}
