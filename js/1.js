window.onload=function(){
	var yonghu=document.querySelector('input[type=text]')
	var tankuang=document.getElementsByClassName('alert')[0];
	yonghu.oninput=function(){
		if(yonghu.value==''){
			tankuang.className="alert alert-warning";
		}else{
			tankuang.className="alert alert-warning hidden";
		}
	}
}
