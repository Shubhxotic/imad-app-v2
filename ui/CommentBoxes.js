var ab1=document.getElementById('submitAr1');
ab1.onclick=function(){
	//Create a request
	var request=new XMLHttpResponse();

	//get response and render it
	comments=[];
	var response=request.responseText();
	comments=JSON.parse(response);


	//make a request
	request.open('GET','')
}
