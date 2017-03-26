var express = require('express');   //express is the library used to create the web server
var morgan = require('morgan');		//helps to manage logs of the server i,e, what sorts of requests we get, etc.
var path = require('path');			
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');

var config={
	user:'shubhxotic',
	database:'shubhxotic',
	host:'db.imad.hasura-app.io',
	port:5432,
	password: 'db-shubhxotic-72787'
};

var pool=new Pool(config);

/*
var articles ={
	'article-one': {
		title: 'Article One|Shubham Agarwal',
		heading: 'Article One',
		date: 'Sept 5,2010',
		content: `
		<div>
		<a href="/">HOME</a>
		</div>
	<hr/>
	<div>
		<h1>Article One</h1>
	</div>
	<div>
		<p> This is the first article. Yet to be formatted </p>
		<br>
		<p> This is the first article. Yet to be formatted </p>
		<br>
	</div> `

	}
}
*/

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
	secret: 'Some random string',
	cookie: {maxAge: 1000*60*60*24*30}
}));

function createTemplate(data){
	var title=data.title;
	console.log("title="+title);
	var date=data.date.toDateString();
	var heading=data.heading;
	var content=data.content;

	var htmlTemplate=`
	<html>
		<head>
			<title>
				${title}
			</title>
			<meta  name="viewport" content="width=device-width , initial-scale=1">
			<link href="/ui/style.css" rel="stylesheet" />
		</head>
		<body>
			<div class="container center">
	<div>
		<a href="/">HOME</a>
	</div>
	<hr/>
		<h1>${heading}</h1>
		<div>
			${date}
		</div>
		<div>
			${content}
		</div>
		</div>
		</body>
	</html>
	`;
	return htmlTemplate;	
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

/*var counter=0;
app.get('/counter',function(req,res){
	counter=counter+1;
	res.send(counter.toString());
});*/

app.get('/counter',function(req,res){
	console.log("entering counter end point");
	pool.query("Select * from count",function(err,result){
	if(err)
	{
		res.status(500).send(err.toString());
	}
	else
	{
		var counter=result.rows[0].counter;
		console.log("counter="+counter);
		pool.query("UPDATE count SET counter=counter+1 where counter=$1",[counter],function(err,result){
		if(err)
		{
			res.status(500).send(err.toString());
		}
		else
		{
			counter=counter+1;
			res.send(counter.toString());
		}
		});
	}
	});
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

var commentArr=[];
app.get('/submitComment',function(req,res){
	var com=req.query.Com;
	commentArr.push(com);
	res.send(JSON.stringify(commentArr));
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


//app.get('/article-one',function(req,res){
	/*var com=req.query.comment;
	commentar1.push(com);
	if(commentar1.length>0 && commentar1[0].length>0)
	{
		res.send(JSON.stringify(commentsar1));
	}
	else
	{*/
//		res.sendFile(path.join(__dirname,'ui', 'article-one.html'));
	//}
//});

/*app.get('/article-two',function(req,res){
	res.sendFile(path.join(__dirname,'ui', 'article-two.html'));
});
*/
app.get('/articles/:articleName',function(req,res){
	var articleName=req.params.articleName;
	console.log("article name inside / style="+articleName);
	//var articleData=
	console.log("Select * from article where title= '"+req.params.articleName+"'");
	//pool.query("Select * from article where title= '"+req.params.articleName+"';",function(err,result){
	//console.log("result="+result.length);
	pool.query("Select * from article where title= $1",[articleName],function(err,result){			
		if(err)
		{
			res.status(500).send(err.toString());
		}
		else
		{
			console.log(result.rows.length);
			if(result.rows.length === 0)
			{
				res.status(404).send('articlese not FOUND');
			}
			else{
				var articleData=result.rows[0];
				res.send(createTemplate(articleData));			
			}
		}
	});
	
});

app.get('/articles',function(req,res){
	var articleName=req.query.article;
	console.log("article name="+articleName);
	//var articleData=
	//pool.query("Select * from article where title= '"+req.query.article+"';",function(err,result){
		pool.query("Select * from article where title= $1",[articleName],function(err,result){
		if(err)
		{
			res.status(500).send(err.toString());
		}
		else
		{
			console.log(result.rows.length);
			if(result.rows.length === 0)
			{
				
				var articleData=result.rows[0];
				console.log("sdad"+articleData);
				res.sendFile(createTemplate(articleData));
				res.status(404).send('articlese not FOUNd');
			}
			else{
				var articleData=result.rows[0];
				res.sendFile(createTemplate(articleData));			
			}
		}
	});
	
});

function hash(input,salt){
	//How do we create a hash?
	var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
	return ['pbkdf2',salt,"10000",hashed.toString('hex')].join('$');
	//algorithm:md5
}

app.get('/hash/:input',function(req,res){
	var hashedStr=hash(req.params.input,'this is the random salt');
	res.send(hashedStr);
});

app.post('/create-user',function(req,res){
	//Obtain username and password from JSON
	var username=req.body.username;
	console.log("username="+username);
	var password=req.body.password;
	var salt=crypto.randomBytes(128).toString('hex');
	var dbString=hash(password,salt);
	pool.query('Select * from "user" where username=($1)',[username],function(err,result){
		if(err)
			res.status(500).send(err.toString());
		else if(result.rows.length === 0)
			{
				pool.query('Insert into "user" (username,password) values ($1,$2)',[username,dbString]	,function(err,result){
				if(err)
				{
					res.status(500).send(err.toString());
				}
				else{
					res.send("user "+username+" successfully created ");
					}
				});
			}
			else{
				res.status(403).send('Username already exists');
			}
	});
});

app.post('/login',function(req,res){
	//Obtain username and password from JSON
	var username=req.body.username;
	var password=req.body.password;

	pool.query('Select * from "user" where username=$1',[username],function(err,result){
		if(err)
		{
			res.status(500).send(err.toString());
		}
		else{
			if(result.rows.length===0)
			{
				res.status(403).send('Invalid username/password');
			}
			else{
					var dbString=result.rows[0].password;
					var salt=dbString.split('$')[1];
					var hashedPass=hash(password,salt);
					if(dbString===hashedPass){
						//Set a session	
						req.session.auth={userId: result.rows[0].id};
						console.log("id="+req.session.auth.userId);
							//set cookie with a session id
							//on the server side , it maps the session id to an object {auth: {userId}}

						res.send("successfully Logged in");
					}
					else{
					res.status(403).send('Invalid username/password');					
					}
				}
		}
	});
});

app.get('/check-login',function(req,res){
	if(req.session && req.session.auth)
	{
		console.log('dsasdasdasdasd');
		if(req.session.auth.userId){
			console.log('sdda');
			res.send('You are Logged in as '+req.session.auth.userId.toString());
		}
	}
	else{
		res.send('You are not logged in');
	}
});

app.get('/logout',function(req,res){
	delete req.session.auth;
	res.send("successfully logged out");
});

var port = 8000; // Use 8080 for local development because you might already have apache running on 80
app.listen(8000, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
app.get('/test-db',function(req,res)
{
	pool.query('Select * from test', function(err,result){
		if(err)
		{
			res.status(500).send(err.toString());
		}
		else{
			res.send(JSON.stringify(result.rows));
		}
	});
});



