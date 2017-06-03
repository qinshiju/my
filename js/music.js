document.addEventListener('DOMContentLoaded',function(){
	var oPlay=document.querySelector('.play');
	var oAudio=document.querySelector('audio');
	var oStart=document.querySelector('.start');
	var oStartImg=document.querySelector('.start-img');
	var play=true;
	var oToTal=document.querySelector('.total')
	var oBar=document.querySelector('.bar');
	var oHadPlay=document.querySelector('.had-play');
	var hadTimer=document.querySelector('#had-timer');
	var allTimer=document.querySelector('#all-timer');
	var oMusic=document.querySelector('.music');
	var oLove=document.querySelector('.love');
	var oCountMusic=document.querySelector('.count-music');
	var oCountLove=document.querySelector('.count-love');
	var x=0;
	var aboveX=0;
	var numDragpaddingLeft=0;
	var num=1;
	var controler=null;
	var controlerBar=null;
	var oShared=document.querySelector('#shared');
	var oSoung=document.querySelector('#soung');
	var oSinger=document.querySelector('#singer');
	var URL="https://www.starcandy.cn/mp/me";
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURIComponent(r[2]); return null;
	}
	ajax({
		url:URL,
		type:'GET',
		success:function (str) {
			var json= JSON.parse(str);
			var oDiv=document.createElement('div');
			console.log(getQueryString("songMusicFileName"))
			oDiv.innerHTML='<nav class="nav">'+
				'<img src="images/分享@2x.png" alt="">'+
				'</nav>'+
				'<p class="sing">'+
				'<span id="soung">'+getQueryString("songName")+'——</span>'+
			'<span id="singer">'+getQueryString("songSinger")+'</span>'+
				'</p>'+
				'<img src='+json.headImgUrl+' alt="" class="img">'
			oShared.appendChild(oDiv);
			oAudio.src=getQueryString("songMusicFileName");
		},
		error:function (error) {
			window.location.href="https://www.starcandy.cn/mp/login?redirectUrl=http%3a%2f%2flocalhost%3a8080%2findex.html"
		}
	});
	oStart.addEventListener('click',function(){
		if (play) {
			oAudio.play()
			oStartImg.src='images/play.png';
			play=false;
			time()
			controler=setInterval(time,1000);
			controlerBar=setInterval(progress,1000);
		}else{
			oAudio.pause();
			oStartImg.src='images/stop.png';
			play=true;
		}
	},false)
	function cutTime(time){
	    var value = (time > 10 ? time + '' : '0' + time).substring(0, 2);
	    return isNaN(value) ? '00' : value;
    };

	function time(){
		var allTime = oAudio.duration,
			hadTime = oAudio.currentTime;
		hadTimer.innerHTML=''+cutTime(hadTime / 60)+':'+ cutTime(hadTime % 60)+'';
		allTimer.innerHTML=''+cutTime(allTime / 60)+':'+cutTime(allTime % 60)+'';
		return hadTimer.innerHTML,allTimer.innerHTML
	}
	function progress(){
		var cuT = oAudio.currentTime,
			toT = oAudio.duration;
		var oToTalWidth=oToTal.offsetWidth/20;
		progress = (cuT/toT)*oToTalWidth;
		
		oHadPlay.style.width=progress+'rem';
		oBar.style.left=progress+'rem';
		return oHadPlay.style.width

	};
        oBar.addEventListener("touchstart", function(e){
        	var touchMoveTime=oAudio.currentTime;
        	var touch = e.targetTouches[0];
	        startX = touch.pageX;
	    	function touchMove(e) { //滑动
		        var toT = oAudio.duration;
		        var touch = e.targetTouches[0];
		        var oToTalWidth=oToTal.offsetWidth/20; //总距离
		        x = (touch.pageX - startX)/20; //滑动的距离
		        var widthBar =aboveX+ x;
		        
		        if(widthBar>16.25){
		            widthBar=16.25;
		    	}else{
		    		if (widthBar<0) {
		    			widthBar=0
		    		}
		    	}

	    		oBar.style.left = widthBar-0.65+ "rem";
	           	oHadPlay.style.width=widthBar+'rem';
		    	return oBar.style.left
		    }
		    function touchEnd(e) { //手指离开屏幕
		        aboveX = parseInt(oBar.style.left);
		        var touch = e.targetTouches[0];
		        var dragPaddingLeft = oBar.style.left;
		        var changeLeft = dragPaddingLeft.replace("rem", "");
		        numDragpaddingLeft = changeLeft;
		        var currentTime = (numDragpaddingLeft / (oToTal.offsetWidth/20)) * oAudio.duration;//0.75是拖动圆圈的长度，减掉是为了让歌曲结束的时候不会跑到window以外
		        oAudio.currentTime = currentTime;
		        time();
		        oBar.removeEventListener('touchmove',touchMove,false)
		        oBar.removeEventListener('touchend',touchEnd,false)
		    };
		    oBar.addEventListener("touchmove", touchMove, false);
    		oBar.addEventListener("touchend", touchEnd, false);
    		e.preventDefault();

   		}, false);
		oAudio.addEventListener('ended',function(){
			oStartImg.src='images/stop.png';
			play=true;
		},false)
		oAudio.addEventListener('loadedmetadata',function(){
			time()
		},false)
},false)
