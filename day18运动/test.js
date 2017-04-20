<script>  
        window.onload = function(){  
            var oDiv = document.getElementById('div1');  
            oDiv.onmouseover = function () {  
               startMove(oDiv,{width:300,height:300,opacity:30});  
            }  
            oDiv.onmouseout = function () {  
                startMove(oDiv,{width:200,height:200,opacity:100});  
            }  
        }  
        function getStyle(obj,attr){  
            return getComputedStyle ? getComputedStyle(obj,false)[attr] : obj.currentStyle[attr];  
        }  
        function startMove(obj,json,fn) {//json代替了原来的attr和iTarger参数  
            clearInterval(obj.timer);  
            obj.timer = setInterval(function () {  
              for(attr in json){  
                  var objAttr = 0;  
                  if(attr == "opacity"){ // 由于for in里的key名字是attr所以这里不用替换  
                      objAttr = Math.round(parseFloat(getStyle(obj,attr))*100);  
                  }else{  
                      objAttr = parseInt(getStyle(obj,attr));  
                  }  
                  var iSpeed = (json[attr] -objAttr)/10;// 由之前的iTarget替换成了json[attr]  
                  iSpeed = iSpeed>0 ?Math.ceil(iSpeed):Math.floor(iSpeed);  
                  if(objAttr == json[attr]){  
                      clearInterval(obj.timer);  
                      if(fn){// 如果传了 “下一个运动的函数” 就执行  
                          fn();  
                      }  
                  }else{  
                      if(attr == "opacity"){  
                          obj.style.filter = 'alpha(opacity:'+(objAttr+iSpeed)+')';  
                          obj.style.opacity = (objAttr+iSpeed)/100;  
                      }else{  
                          obj.style[attr] =  objAttr+iSpeed+'px';  
                      }  
                  }  
              }  
            },30);  
        }  
</script> 