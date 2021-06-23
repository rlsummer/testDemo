$(window).on('load',function(){
	waterfall();
	var dataInt = {"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'}]}
	$(window).on('scroll',function(){
		if(checkScrollSlide()){
			$.each(dataInt.data,function(key,value){
				var oBox = $('<div>').addClass('box').appendTo($('#main'));
				// console.log(oBox)
				var oPic = $('<div>').addClass('pic').appendTo($(oBox));
				console.log(oPic);
				console.log($(oPic));
				$('<img>').attr('src','img/' + $(value).attr('src')).appendTo($(oPic));
			})
			waterfall();
		}
	})
})

function waterfall(){ //瀑布流位置
	var $boxs = $('#main>div');
	var w = $boxs.eq(0).outerWidth();
	var cols = Math.floor($(window).width()/w);
	$('#main').width(w*cols).css('margin','0 auto');
	var hArr = [];
	$boxs.each(function(index,value){
		var h = $boxs.eq(index).outerHeight();
		if(index<cols){
			hArr[index] = h;
		}else{
			var minH = Math.min.apply(null,hArr);
			var minHIndex = $.inArray(minH,hArr); //Jquery判断某个值的索引
			$(value).css({
				'position':'absolute',
				'top':minH + 'px',
				'left':minHIndex*w + 'px'
			})
			hArr[minHIndex] += $boxs.eq(index).outerHeight()
		}		
	})
}
function checkScrollSlide(){ //滚动加载
		var $lastBox = $('#main>div').last();
		var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight()/2); 
		var scrollTop = $(window).scrollTop();
		var documentH = $(window).height();
		return (lastBoxDis < scrollTop+documentH) ? true : false;
	}
// $(function(){
	
// })