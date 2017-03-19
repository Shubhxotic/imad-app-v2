var ab1=document.getElementById('submitAr1');
ab1.onclick=function(){
	//Create a request
	var request=new XMLHttpResponse();

	//get response and render it
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpResponse.DONE)
		{
			if(request.status === 200)
			{
				comments=[];
				var xyz='';
				var response=request.responseText();
				comments=JSON.parse(response);
				for(var i=0;i<comments.length; i++){
					xyz+='<li>'+comments[i]+'</li>';
				}
				var temp=document.getElementById('namelistAr1');
				temp.innerHTML=xyz;
			}
		}
	}

	//make a request
	var cbox1=document.getElementById('commentBox1');
	var cbox1Text=cbox1.value;
	request.open('GET','127.0.0.1:8000/article-one/'+cbox1Text,true);
	request.send(null);
}
