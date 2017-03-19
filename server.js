var express = require('express');   //express is the library used to create the web server
var morgan = require('morgan');		//helps to manage logs of the server i,e, what sorts of requests we get, etc.
var path = require('path');			

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

var counter=0;
app.get('/counter',function(req,res){
	counter=counter+1;
	res.send(counter.toString());
});
/*
var names=[];
app.get('/submit-name/:name',function(req,res){
	var name=req.params.name;
	console.log(name);
	names.push(name);
	console.log(names);
	res.send(JSON.stringify(names));	
});
*/
var names=[];
app.get('/submit-name',function(req,res){  //URL: /submit-name?name=xxxxxx
	var name=req.query.name;
	console.log(name);
	names.push(name);
	console.log(names);
	res.send(JSON.stringify(names));	
});
/*
var comments1=[];
app.get('/article-one/:comment',function(req,res){
	var com=req.params.comment;
	comments1.push(com);
	console.log("comments array="+comments1);
	res.send(JSON.stringify(comments1));
});
*/

var com1=[];
app.get('/submit-comment',function(req,res){  //URL: /submit-name?name=xxxxxx
	var com=req.query.comment;
	console.log("com="+com);
	com1.push(com);
	console.log(com1);
	res.send(JSON.stringify(com1));
	});	

app.get('/index1',function(req,res){
	res.sendFile(path.join(__dirname,'ui','index1.html'));
});

app.get('/ui/main.js', function(req,res){
    res.sendFile(path.join(__dirname, 'ui' , 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
var commentar1=[];
app.get('/article-one',function(req,res){
	/*var com=req.query.comment;
	commentar1.push(com);
	if(commentar1.length>0 && commentar1[0].length>0)
	{
		res.send(JSON.stringify(commentsar1));
	}
	else
	{*/
		res.sendFile(path.join(__dirname,'ui', 'article-one.html'));
	//}
});

app.get('/article-two',function(req,res){
	res.sendFile(path.join(__dirname,'ui', 'article-two.html'));
});

app.get('/article-three',function(req,res){
	res.sendFile(path.join(__dirname,'ui', 'article-three.html'));
});


var port = 8000; // Use 8080 for local development because you might already have apache running on 80
app.listen(8000, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
