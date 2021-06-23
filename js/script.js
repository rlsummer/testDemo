window.onload = function(){
	waterfall('main','box');
	var dataInt = {"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'}]}
	window.onscroll = function(){ //拖动滚动条时触发
		if(checkScrollSlide()){
			var oParent = document.getElementById('main');
			//将数据库渲染到页面的尾部
			for(var i = 0;i<dataInt.data.length;i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = 'img/' + dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
	}
}

function waterfall(parent,box){
	//将main下的所有class为box的元素取出来
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent,box);
	// 计算整个页面显示的列数（页面宽度/box的宽）
	var oBoxW = oBoxs[0].offsetWidth;
	console.log(oBoxW);
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	//设置main宽度
	oParent.style.cssText = 'width:'+oBoxW*cols+'px;margin:0 auto';
	
	var hArr = []; //存放每一列高度的数组
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight)
		}else{
			var minH = Math.min.apply(null,hArr);
			//var minH = Math.min(...hArr);
			// var index = hArr.indexOf(minH); 另一种简单写法
			var index = getMinhIndex(hArr,minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH + 'px';
			//oBoxs[i].style.left =  oBoxW * index + 'px';
			oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
			hArr[index] += oBoxs[i].offsetHeight;
		}
	}
}
//根据class获取元素
function getByClass(parent,className){
	var boxArr = []; //用来存储获取到的所有class为box的元素
	var oElements = parent.getElementsByTagName('*');
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className == className){
			boxArr.push(oElements[i])
		}
	}
	var boxArr1 = parent.getElementsByClassName(className);
	console.log(boxArr);
	console.log('**********');
	console.log(boxArr1);
	return boxArr;
}
function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i] == val){
			return i;
		}
	}
}

//检测是否具备了滚动条加载数据块的条件
function checkScrollSlide(){
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	return lastBoxH < scrollTop+height ? true : false;
}