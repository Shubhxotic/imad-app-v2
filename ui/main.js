console.log('Loaded!');
var elem=document.getElementById('upper html');
elem.innerHTML= "This is Shubham's Website";

var marginLeft=0;
var	marginRight=0;
var image=document.getElementById('img-index');
function moveright() {
	// body...
	marginLeft+=10;
	image.style.marginLeft= marginLeft+'px';
	if(marginLeft>120){
		marginRight+=10;
		image.style.marginRight= marginRight +'px';
		marginLeft-=10;	
	image.style.marginLeft= marginLeft+'px';
	
	}if(marginRight>120){
		marginLeft+=10;
		marginRight-=10;
	image.style.marginLeft= marginLeft+'px';
		image.style.marginRight= marginRight +'px';
		
	
	}
}

image.onclick= function()
{
	var interval= setInterval(moveright,100);
}

//var counter=0;
var	button=document.getElementById('counter');
button.onclick=function(){

	//Create a request object
	var request = new XMLHttpRequest();
	
	//Capture a response and store it in and variable
	request.onreadystatechange= function(){
		if(request.readyState === XMLHttpRequest.DONE)
		{
			if(request.status === 200)
			{
				var counter=request.responseText;
				console.log(counter);
				var span=document.getElementById('count');
				span.innerHTML=counter.toString();				
			}
		}
	};

	//Make a request to counter endpoint 
	request.open('GET','http://127.0.0.1:8000/counter',true);
	request.send(null);
	console.log("requesing");

	//Render the variable in correct span


	/*counter=counter+1;
	var sp=document.getElementById('count');
	sp.innerHTML=counter.toString();*/
};

var submit= document.getElementById('submit1');
submit1.onclick=function(){
	//Make request to the server and send the name
	var request= new XMLHttpRequest();
	//Capture a list of names and render it as a list
	request.onreadystatechange= function(){
		if(request.readyState === XMLHttpRequest.DONE)
		{
			if(request.status === 200)
			{
				var names=request.responseText;
				names=JSON.parse(names);
				var list='';
				for (var i=0; i<names.length;i++) {
					list+= '<li>' + names[i] + '</li>';
				}	
				var ul=document.getElementById('namelist');
				ul.innerHTML=list;
			}
		}
	}
var nameInput=document.getElementById('name');
var nam = nameInput.value;
console.log("nam="+nam);
//request.open('GET','http://127.0.0.1:8000/submit-name/'+nam,true);
request.open('GET','http://127.0.0.1:8000/submit-name?name='+nam,true);
request.send(null);
}