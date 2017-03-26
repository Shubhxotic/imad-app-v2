console.log('Loaded!');
var elem=document.getElementById('upper_html');
setTimeout(function(){elem.innerHTML= "Welcome To my website";},8000);
setTimeout(function(){
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
},0);

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

image.onclick = function()
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


var clogin=document.getElementById('checkLogin');
var login= document.getElementById('LogIn');
login.onclick=function(){
	//Make request to the server and send the name
	var request= new XMLHttpRequest();
	//Capture a list of names and render it as a list
	request.onreadystatechange= function(){
		if(request.readyState === XMLHttpRequest.DONE)
		{
			if(request.status === 200)
			{	
				clogin.innerHTML="U are Logged In";
				alert('Logged In successsfully');
				}
				else if(request.status===403)
				{
					alert('username/password is incorrect');
				}
				else if(request.status===500)
				{
					alert('Server Error');
				}
			}
		}
	
var user=document.getElementById('usernm').value;
var pass=document.getElementById('passwd').value;
console.log(user +" "+pass);
request.open('POST','http://127.0.0.1:8000/login',true);
request.setRequestHeader('Content-Type','application/json');		//Equivalent of curl statement:- curl -v -H 'Content-Type: application/json' --data '{"username": "Saunchit","password": "MrMac"}' http://127.0.0.1:8000/create-user
request.send(JSON.stringify({username: user,password: pass}));
};

var logout= document.getElementById('LogOut');
logout.onclick=function(){
	//Make request to the server and send the name
	var request= new XMLHttpRequest();
	//Capture a list of names and render it as a list
	request.onreadystatechange= function(){
		if(request.readyState === XMLHttpRequest.DONE)
		{
			if(request.status===200)
			{
				clogin.innerHTML="Logged Out successsfully";
				alert("Logged out successsfully");
			}
		}
	}
	request.open('GET','http://127.0.0.1:8000/logout',true);
	request.send(null);
}

var signup= document.getElementById('SignUp');
signup.onclick=function(){
	//Make request to the server and send the name
	var request= new XMLHttpRequest();
	//Capture a list of names and render it as a list
	request.onreadystatechange= function(){
		if(request.readyState === XMLHttpRequest.DONE)
		{
			if(request.status===200)
			{
				clogin.innerHTML="Account created successsfully";
				alert('User created successsfully');
				console.log('User created successsfully');
			}
			else if(request.status === 403)
			{
				alert('Username already exists');
			}
			else if(request.status === 500)
			{
				alert('Internal Server Error');
			}
		}
	}
	var pass=document.getElementById('passwd').value;
	var user=document.getElementById('usernm').value;
	//console.log(pass);	
	request.open('POST','http://127.0.0.1:8000/create-user',true);
	request.setRequestHeader('Content-Type','application/json');		//Equivalent of curl statement:- curl -v -H 'Content-Type: application/json' --data '{"username": "Saunchit","password": "MrMac"}' http://127.0.0.1:8000/create-user
	request.send(JSON.stringify({username: user,password: pass}));
}

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


var submitCom= document.getElementById('submitCom');
submitCom.onclick=function(){
	//Make request to the server and send the name
	var request= new XMLHttpRequest();
	//Capture a list of names and render it as a list
	request.onreadystatechange= function(){
		if(request.readyState === XMLHttpRequest.DONE)
		{
			if(request.status === 200)
			{
				var comments=request.responseText;
				comments=JSON.parse(comments);
				var list='';
				for (var i=0; i<comments.length;i++) {
					list+= '<li>' + comments[i] + '</li>';
				}	
				var ul=document.getElementById('displayCom');
				ul.innerHTML=list;
			}
		}
	}
var nameInput=document.getElementById('CommentBox');
var nam = nameInput.value;
console.log("nam="+nam);
//request.open('GET','http://127.0.0.1:8000/submit-name/'+nam,true);
request.open('GET','http://127.0.0.1:8000/submitComment?Com='+nam,true);
request.send(null);
}


