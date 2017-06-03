document.addEventListener('DOMContentLoaded',function () {
	var URL="https://www.starcandy.cn/mp/work";
	ajax({
		url:URL,
		data:{
			songName:'',
			songSingers:'',
			songMusicFileName:''
		},
		type:'GET',
		success:function (str) {
			var arr=JSON.parse(str);
			var oUl=document.querySelector('.sound');
			for (var i=0; i<arr.length; i++){
				var aLi=document.createElement('li');
				aLi.innerHTML='<div class="song-singer">'+
					'<span class="song">'+arr[i].song.name+'</span>'+
					'<span  class="singer">'+arr[i].song.singers+'</span>'+
					'</div>'+
					'<div class="shar-del">'+
					'<span class="delete"  data="'+arr[i].id+'">删除</span>'+
					'</div>'
					// '<div class="my-look">自己可见</div>';
				oUl.appendChild(aLi);
				var aShare=document.querySelectorAll('.share');
				var aDelete=document.querySelectorAll('.delete');
				var aLi=document.querySelectorAll('li');
				var aMyLook=document.querySelectorAll('.my-look');
				var aSongSinger=document.querySelectorAll('.song-singer');
				var x=0;
				aDelete[i].addEventListener('click',function (e) {
					var songId=parseInt(e.currentTarget.attributes.data.value);
					var url = "https://www.starcandy.cn/mp/work/"+songId;
					if(window.XMLHttpRequest){
						var xhr = new XMLHttpRequest();
					}else{
						var xhr = new ActiveXObject('Microsoft.XMLHTTP');
					};
					xhr.open("DELETE", url, true);
					xhr.onload = function () {
						if (xhr.readyState == 4 && xhr.status == "200" && xhr.status<300 || xhr.status==304) {
							console.log("222");
							window.location.reload();
						} else {
							console.log(error);
						};
					};
					xhr.send(null);
				},false)
				for (var j=0; j<aSongSinger.length;j++){
					aSongSinger[j].index=j;
					aSongSinger[j].addEventListener('click',function () {
						songName=arr[this.index].song.name;
						songSingers=arr[this.index].song.singers;
						songMusicFileName=arr[this.index].url;
						window.location.href='music.html?songName='+songName+'&songSinger='+songSingers+'&songMusicFileName='+songMusicFileName;
					},false)
				};

				// for (var l=0; l<aLi.length; l++){
				// 	aLi[l].indexT=l;
				// 	aLi[l].addEventListener('touchstart',function(e){
				// 		var startX=e.targetTouches[0].pageX-x;
				// 		function touchMove(e){
				// 			x=e.targetTouches[0].pageX-startX;
				// 			if (x<0) {
				// 				aLi[this.indexT].style.width=20.225+'rem';
				// 				aLi[this.indexT].style.left=-3+'rem';
				// 				x=0
				// 			}else{
				// 				aLi[this.indexT].style.width=17.225+'rem';
				// 				aLi[this.indexT].style.left=0+'rem';
				// 				x=0;
				// 			};
				// 		};
				// 		function touchEnd(){
				// 			aLi[this.indexT].removeEventListener('touchmove',touchMove,false)
				// 			aLi[this.indexT].removeEventListener('touchend',touchEnd,false)
				// 		};
				// 		aLi[this.indexT].addEventListener('touchmove',touchMove,false);
				// 		aLi[this.indexT].addEventListener('touchend',touchEnd,false);
				// 		//e.preventDefault();
				// 	},false);
				// };

			};

		},
		error:function (error) {
			var lets=window.location+'/index.html';
			window.location.href="https://www.starcandy.cn/mp/login?redirectUrl="+lets;
		}
	})
},false);