var clearAddTimer = false;
var mainUrl = 'https://gift.d.cn/cj';
/*var mainUrl = '';*/
function addTimer() {
	var i = document.createElement('i');
	var random = Math.random();
	var num = (random > 0.9 ? 0.8 : random) * 100;
	i.style.left = num + '%';
	switch(random.toFixed(1)) {
		case '0.2':
			i.className = 'bao test type1';
			break;
		case '0.4':
			i.className = 'bao test type2';
			break;
		case '0.6':
			i.className = 'bao test type3';
			break;
		case '0.8':
			i.className = 'bao test type4';
			break;
		case '0.9':
			i.className = 'bao test type5';
			break;
		default:
			i.className = 'bao test';
			break;
	}

	if(window.requestAnimationFrame) {
		window.requestAnimationFrame(function() {
			$('body').append(i)
		});
	} else {
		$('body').append(i);
	}

	if(!clearAddTimer) {
		setTimeout(function() {
			addTimer()
		}, 200)
	}

}
var t = true;
var pressMoveImg = document.querySelector(".bear");
Transform(pressMoveImg);
new AlloyFinger(pressMoveImg, {
	pressMove: function(evt) {
		pressMoveImg.translateX += evt.deltaX;
		pressMoveImg.translateY += evt.deltaY;
		/*check();*/
		$(pressMoveImg).removeClass('bear-move');
		$('.bear-tips').addClass('dn');
		evt.preventDefault();
	}
});

function check() {
	[].forEach.call($('.test', true), function(a) {
		if(a.getBoundingClientRect().top + 60 > pressMoveImg.getBoundingClientRect().top && a.getBoundingClientRect().top - pressMoveImg.getBoundingClientRect().top + 60 < 100 && a.getBoundingClientRect().left - pressMoveImg.getBoundingClientRect().left + 30 > 0 && a.getBoundingClientRect().left - pressMoveImg.getBoundingClientRect().left + 30 < 100) {
			if(t) {
				t = false;
				setTimeout(function() {
					clearAddTimer = true;
					openGift();
				}, 5000)
			}
			var top = a.getBoundingClientRect().top + 'px';
			var left = a.getBoundingClientRect().left + 'px';
			$(a).removeClass('test');
			a.style.top = top;
			a.style.left = left;
			$(a).addClass('boom');
		}
	})
}

function openGift(){
	$('.open').find('img').get(0).src = giftDetail.imgUrl;
	$('.open').removeClass('dn')
}

function checkTimer() {
	check();
	setTimeout(function() {
		checkTimer()
	}, 100)
}

$(window).on('touchmove', function(e) {
	e.preventDefault()
});

/*初始化*/


new xAjax({
	url: mainUrl + '/specialLottery/lottery.json?type=3',
	type: 'get',
	dataType: 'json',
	success:function(data) {
		if(data.code === 2000){
			if(data.data.totalCount <= 0){
				$('.my-gift-box').removeClass('dn');
				$('.play-box').addClass('dn')
			}
		}
	}
});

$('.play-js').on('click',function(){
	new xAjax({
		url: mainUrl + '/specialLottery/lottery.do?type=3',
		type: 'get',
		dataType:'json',
		success:function(data) {
			if(data.code === 2001){
				if(typeof window.AndroidClient === 'undefined'){
					window.location.href = data.data;
				}else{
					
					window.AndroidClient.doLogin();
				}
			}else if(data.code === 2000){
				$('.play-box').addClass('dn');
				addTimer();
				checkTimer();
				giftDetail = data.data.flipLotteryThings[0];
			}else{
				$('.error-tips').find('p').html(data.error);
				$('.error-tips').removeClass('dn')
			}
		}
	})
});
$('.close-js',true).on('click',function(){
	$(this).parents('.out').addClass('dn');
	if($(this).hasClass('close-gift')){
		$('.my-gift-box ').removeClass('dn')
	}
});
$('.list').on('click',function(){
	new xAjax({
		url: mainUrl + '/specialLottery/listThings.json?type=3',
		type: 'get',
		dataType: 'json',
		success:function(data) {
			if(data.code === 2000){
				var html = [];
				data.data.forEach(function(o,i){
					html.push('<li>' + (i+1) + '.' + o.thingName + '</li>')
				});
				$('.show-list').find('ul').html(html.join(''));
				$('.show-list').removeClass('dn')
			}
		}
	})
});
$('.rule').on('click',function(){
	$('.rule-box').removeClass('dn')
});
$('.my-gift-js').on('click',function(){
	new xAjax({
		url: mainUrl + '/specialLottery/winRecords.json?type=3',
		type: 'get',
		dataType: 'json',
		success:function(data) {
			if(data.code === 2000){
				$('.my-gift').find('img').get(0).src = data.data[0].imgUrl;
				$('.my-gift-box').addClass('dn')
				$('.my-gift').removeClass('dn')
			}else if(data.code === 2001){
				if(typeof window.AndroidClient === 'undefined'){
					window.location.href = data.data;
				}else{
					
					window.AndroidClient.doLogin();
				}
			}
		}
	})
});
if(window.location.search.indexOf('_f=sdk')!== -1){
	/*$('.tips').html('<img src="img/sdk.png" />');*/
	$('.tips').html('<img src="https://raw.d.cn/scoremall/wap/2018/specialLottery/type3/img/sdk.png" />')
}
var mql = window.matchMedia("(orientation: portrait)");
function onMatchMeidaChange(mql){
    if(mql.matches) {
        $('.tips').addClass('dn');
    }else {
		$('.tips').removeClass('dn');
    }
}
onMatchMeidaChange(mql);
mql.addListener(onMatchMeidaChange);