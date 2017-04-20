

//获取某元素节点的某属性值
/*
 * obj: 需要获取属性值的元素节点, 如:oBox
 * attr: 需要获取的属性, 如:"left"
 */
function getStyleAttr(obj, attr) {
	if(window.getComputedStyle) { //支持IE9+, 谷歌, 火狐..
		return getComputedStyle(obj, null)[attr];
	}
	return obj.currentStyle[attr]; //支持IE8-
}


//封装startMove
/*
 * obj: 需要运动的元素
 * attr: 需要改变的属性
 * iTarget: 需要到达的目标值(终点值)
 * fn: 回调函数
 */
function startMove(obj, attr, iTarget, fn) {
	
	//关闭之前的定时器
	clearInterval(obj.timer);
	
	//再开启新的定时器
	obj.timer = setInterval(function(){
		
		//1, 获取当前值
		var current = 0;
		if (attr == "opacity") { //透明度
			current = parseFloat(getStyleAttr(obj, attr) * 100);
			current = Math.round(current); //四舍五入
		}
		else { // left/top/width/height...
			current = parseFloat(getStyleAttr(obj, attr));
			current = Math.round(current); //四舍五入
		}
		
		//2, 给一个速度
		var iSpeed = (iTarget - current) / 8;
		iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		
		//3, 判断是否到达目标值
		if (current == iTarget) {
			clearInterval(obj.timer); //关闭定时器, 停止运动
			//console.log("a");
			
			//回调
			if (fn) {
				fn(); 
			}
			
			return; //退出函数, 不再执行下面的语句
		}
		
		//4, 运动
		if (attr == "opacity") { //透明度
			obj.style.opacity = (current + iSpeed) / 100;
			obj.style.filter = "alpha(opacity=" + (current + iSpeed) + ")";
		}
		else { // left/top/width/height
			obj.style[attr] = current + iSpeed + "px";
		}
		
	}, 30);
}







