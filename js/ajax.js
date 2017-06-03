function jsonToStr(json){
	json.t = Math.random();
	var arr = [];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	var str = arr.join('&');
	return str;
}

//url,data,type,fnSucc,fnError
function ajax(json){
	var json = json || {};
	if(!json.url){
		alert('用法不合理');
		return;
	}
	json.data = json.data || {};
	json.type = json.type || 'GET';

	// 1、创建ajax
	if(window.XMLHttpRequest){
		var oAjax = new XMLHttpRequest();
	}else{
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}

	switch(json.type.toUpperCase()){
		case 'POST':
			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			oAjax.send(jsonToStr(json.data));
			break;
		case 'GET':
			oAjax.open('GET',json.url+'?'+jsonToStr(json.data),true);
			oAjax.send();
			break;
	}

	// 4、接收数据
	oAjax.onreadystatechange = function(){
		if(oAjax.readyState == 4){
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				json.success && json.success(oAjax.responseText);
			}else{
				json.error && json.error(oAjax.status);
			}
		}
	}
}