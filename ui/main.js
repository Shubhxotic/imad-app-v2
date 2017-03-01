console.log('Loaded!');
var elem=document.getElementById('upper html');
elem.innerHTML= "This is Shubham's Website";

var marginLeft=0;
var image=document.getElementById('img-index');
function moveright() {
	// body...
	marginLeft+=10;
	image.style.marginLeft= marginLeft+'px';
}
image.onclick= function()
{
	var interval= setInterval(moveright,100);
}

