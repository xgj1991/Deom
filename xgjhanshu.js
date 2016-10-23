//判断浏览器是不是ie8或ie9
if(navigator.userAgent.indexOf('MSIE 8.0') !== -1||navigator.userAgent.indexOf('MSIE 9.0')!==-1) 




//缩放（只兼容ie9不兼容ie8 ）
/*{
min：缩放的最小值；
max：缩放的最大值；
sca:最初的缩放值；
obj：缩放的对象 ； 
time：每次缩放的时间间隔 ；
onoff：第一次是缩小还是放大  ；	
}*/
function xgjsf(obje){
	var settings={
		min:obje.min||0.8,
		max:obje.max||1,
		sca:obje.sca||1,
		obj:obje.obj, 
		time:obje.time||16, 
		onoff:obje.onoff||true
		}
	setInterval(function(){ 
		if(settings.onoff){
			settings.sca=settings.sca-0.005;
			settings.obj.style['-ms-transform']='scale('+settings.sca+')';
			if(settings.sca<=settings.min){
				settings.onoff=false;
			}
		}else{
			settings.sca=settings.sca+0.005;
			settings.obj.style['-ms-transform']='scale('+settings.sca+')';
			if(settings.sca>=settings.max){
				settings.onoff=true;
			}
		}
	},settings.time)
}

//自定义滚动条（兼容ie8不需要jq ）
/*
 * slideWarp:滚动条（获取的元素）
 * slide:滑动的块(不需要设置高度，需要有相对于滚动条的定位)
 * text:文本(有overflow：hidden的那一项)
 * textCon: 文本内容(需要有相对于文本的内容)
 * */
function xgjscro(slideWarp,slide,text,textCon){
	var t=0;	//滚动条的top值
	var timer;
	var scale=textCon.offsetHeight/text.offsetHeight;
	if(scale<=1){
		slide.style.display='none';
		return;
	}else if(scale>=20){
		scale=20
	}
	slide.style.height=text.offsetHeight/scale+'px';
	
	
	
	//滑块的最大移动范围
	var barMaxH=slideWarp.offsetHeight-slide.offsetHeight;
	var textMaxH=textCon.offsetHeight-text.offsetHeight;
	
	slide.onmousedown=function(ev){
		ev=ev||event;
		ev.cancelBubble=true;
		var disY=ev.clientY-this.offsetTop;
		
		document.onmousemove=function(ev){
			ev=ev||event;
			t=ev.clientY-disY;
			moveTo();
		};
		document.onmouseup=function(){
			document.onmousemove=null;
		}
		
		return false;
	};
	
	//主体功能
	function moveTo(){
		if(t<0){
			t=0;
		}else if(t>barMaxH){
			t=barMaxH;
		}
		
		var scale=t/barMaxH;
		
		textCon.style.top=-scale*textMaxH+'px';
		slide.style.top=t+'px';
	};
	
	//把鼠标滚轮事件添加到最外层的元素身上
	mScroll(text,function(){
		t-=10;
		moveTo();
		
	},function(){
		t+=10;
		moveTo();
	});
	
	
	
	slideWarp.onmousedown=function(ev){
		ev=ev||event;
		if(ev.clientY-slideWarp.getBoundingClientRect().top<t){
			//往上走
			t-=50;
			moveTo();
			
		}else{
			//往下走
			t+=50;
			moveTo();
		}
	};
	//滚轮事件
	function mScroll(obj,callBackUp,callBackDown){
		obj.onmousewheel=fn;
		if(navigator.userAgent.indexOf('MSIE 8.0') == -1){
		obj.addEventListener('DOMMouseScroll',fn);}
		function fn(ev){
			ev=ev||event;
			if(ev.wheelDelta>0 || ev.detail<0){
				callBackUp.call(obj);	//改变this指向
			}else{
				callBackDown.call(obj);
			}
			if(navigator.userAgent.indexOf('MSIE 8.0') == -1){
			ev.preventDefault();}
			return false;
		};
	};
}

/*往返运动(左右往返，需要引用jq，能兼容ie8)
 * xgjy:需要运动的对象
 * xgjl1:要运动的位置（带单位，如10px）
 * xgjl2:初始的位置（带单位，如10px）
 * xgjt:往左或往右运动一次所需时间
 * xgjt1:往返一次的时间，必须大于或等于两倍的xgjt
 * */
function xgjyd(xgjy,xgjl1,xgjl2,xgjt,xgjt1){
	xgjyun(xgjy,xgjl1,xgjl2,xgjt)
	setInterval(function(){
		xgjyun(xgjy,xgjl1,xgjl2,xgjt);
	},xgjt1)
	function xgjyun(xgjy,xgjl1,xgjl2,xgjt){
		$(xgjy).stop().animate({left:xgjl1},xgjt,function(){
			$(xgjy).stop().animate({left:xgjl2},xgjt)
		})
	}
}

/*
 * 往返运动(左右往返，需要引用jq，能兼容ie8)
 * xgjy:需要运动的对象
 * xgjl1:要运动的距离（不带单位，如10）
 * xgjl2:初始的位置（带单位，如10px）
 * xgjt:往左或往右运动一次所需时间
 * xgjt1:往返一次的时间，必须大于或等于两倍的xgjt
 * xgjys:单位
 * xgjfw:运动的方向.
 * */
function xgjyd(obje){
	var settings={
		xgjy:obje.xgjy,
		xgjl1:obje.xgjl1||'aaa',
		xgjl2:obje.xgjl2||'bbb',
		xgjt:obje.xgjt||1000,
		xgjt1:obje.xgjt1||2000,
		xgjys:obje.xgjys||'px',
		xgjfw:obje.xgjfw||'left'
		}
	if(settings.xgjys=='rem'){
		console.log('rem');
		var a=document.documentElement.clientWidth/16;
		if(settings.xgjl1=='aaa'){
			settings.xgjl1='5rem';
		}else{
			settings.xgjl1=settings.xgjl1+'rem';	
		}
		if(settings.xgjl2=='bbb'){
			if(settings.xgjfw=='left'){
				settings.xgjl2=$(settings.xgjy)[0].offsetLeft/a+'rem';
			}else if(settings.xgjfw=='top'){
				settings.xgjl2=$(settings.xgjy)[0].offsetTop/a+'rem';
			}
		}else{
			settings.xgjl2=settings.xgjl2+'rem';
		}
	}else if(settings.xgjys=='px'){
		console.log('px')
		if(settings.xgjl1=='aaa'){
			settings.xgjl1='30px';
		}else{
			settings.xgjl1=settings.xgjl1+'px';
		}
		if(settings.xgjl2=='bbb'){
			if(settings.xgjfw=='left'){
				settings.xgjl2=$(settings.xgjy)[0].offsetLeft+'px';
			}else if(settings.xgjfw=='top'){
				settings.xgjl2=$(settings.xgjy)[0].offsetTop+'px';
			}
		}else{
			settings.xgjl2=settings.xgjl2+'px';
		}
	}
	xgjyun(settings.xgjy,settings.xgjl1,settings.xgjl2,settings.xgjt,settings.xgjfw);
	setInterval(function(){
		xgjyun(settings.xgjy,settings.xgjl1,settings.xgjl2,settings.xgjt,settings.xgjfw);
	},settings.xgjt1)
	function xgjyun(xgjy,xgjl1,xgjl2,xgjt,xgjfw){
		if(xgjfw=='left'){
			$(xgjy).stop().animate({left:xgjl1},xgjt,function(){
				$(xgjy).stop().animate({left:xgjl2},xgjt)
			})
		}else if(xgjfw=='top'){
			$(xgjy).stop().animate({top:xgjl1},xgjt,function(){
				$(xgjy).stop().animate({top:xgjl2},xgjt)
			})
		}
	}
}



//轮播图
/*
 * t1:图片移动的时间
 * t2:运行一次的时间
 * */
function xgjMove(obj,t1,t2){
	var xgjwy1=($(obj).children().width())
   	var num=0;
   	var xgjtimer=null;
   	clearInterval(xgjtimer);
   	xgjtimer=setInterval(function(){
   		num++;
   		$(obj).animate({left:-xgjwy1*num+'px'},t1,function(){
       		if(num==$(obj).children().length-1){
       			num=0;
       			$(obj).css({left:-xgjwy1*num+'px'});
       		}
   		})
   	},t2)
}

//在mango框架下使用animate.css有时会出现翻回一页的时候动画还在原有的基础运动；此函数适用于用了mango框架的页面，当然不用mango框架也行，需要引用qj或者zepto
/*
 * e为mango框架change下function中的e
 * obj:要做动画的父级元素,数据类型为字符串（必须为动画元素的父级，不能使父级的父级）;
 * obj1:动画的元素,数据类型为字符串;
 * dh1:animat.css上的动画名字,数据类型为字符串;
 * dh2:animat.css上的动画名字,数据类型为字符串;
 * time1:第一次动画出现的时间；
 * time2:每次动画的间隔时间;
 * na1:定时器的名字,数据类型为字符串,需要在函数前定义一个名为xgjtime和xgjtime1的obj如var xgjtime={t1:null,t2:null}；xgjtime1={t1:null,t2:null}；（xgjtime和xgjtime1的key名字必须一样）
 * shu显示的动画在第几页
 * */

function xgjdh(e,obj,obj1,dh1,dh2,time1,time2,na1,shu){
	if(e.cur==shu){
		$(obj).children(obj1).css('opacity',0);
		clearInterval(xgjtime[na1]);
		clearTimeout(xgjtime1[na1]);
        donghua(obj,obj1,dh1,dh2,time1,time2,na1)
	}else{
        clearInterval(xgjtime[na1]);
        clearTimeout(xgjtime1[na1]);
        $(obj).children(obj1).removeClass(dh1+' animated');
        $(obj).children(obj1).removeClass(dh2+' animated');
    }
	function donghua(obj,obj1,dh1,dh2,time1,time2,na1){
	    var xgjnum=0;
	    xgjtime1[na1]=setTimeout(function(){
	    	xgjtime[na1]=setInterval(function(){
		        $(obj).children(obj1).eq(xgjnum).css('opacity',1)
		        if(xgjnum%2==0){
		            $(obj).children(obj1).eq(xgjnum).addClass(dh1+' animated');    
		        }else{
		            $(obj).children(obj1).eq(xgjnum).addClass(dh2+' animated');
		        }
		        xgjnum++;
		        if(xgjnum==$(obj).children(obj1).length){
		            clearInterval(xgjtime[na1])
		        }
		    },time2)
	    	$(obj).children(obj1).eq(xgjnum).css('opacity',1)
	        $(obj).children(obj1).eq(xgjnum).addClass(dh1+' animated');    
	        xgjnum++;
	        if(xgjnum==$(obj).children(obj1).length){
	            clearInterval(xgjtime[na1])
	        }
	    },time1)
	}
}
