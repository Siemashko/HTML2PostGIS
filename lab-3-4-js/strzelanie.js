var radius = 10;
var x = screen.width / 2;
var y = screen.height / 2;
var points = 0;
var fluct = 0;
var vx = 0;
var vy = 0;
var alpha = 0;

function resetBall() {
	radius = 10;
	x = Math.random()*screen.width;
	y = Math.random()*screen.height;
	vx = 0;
	vy = 0;
}

function paint() {
	var canvas = document.getElementById('canv');
	var ctx = canvas.getContext('2d');
    console.log(screen.width)

	ctx.fillStyle = "#FFF";
	ctx.fillRect(0,0,screen.width,screen.height);
	ctx.fillStyle = 'rgba(255,0,0,'+alpha+')';
	ctx.fillRect(0,0,screen.width,screen.height);
	alpha -= 0.05;
	if (radius > 200) {
		alpha = 1;
		points -= 10;
		resetBall();
		//$('#canvContainer').after('<p>Dostałeś!</p>');
	}
	vx = 0.95 * vx + (Math.random() - 0.5) * fluct + (Math.log(Math.abs(screen.width - x)+0.00001) - Math.log(Math.abs(x)+0.00001)) / 50;
	vy = 0.95 * vy + (Math.random() - 0.5) * fluct + (Math.log(Math.abs(screen.width- y)+0.00001) - Math.log(Math.abs(y)+0.00001)) / 50;
	x += vx;
	y += vy;
	x = Math.max(0,Math.min(x,screen.width));
	y = Math.max(0,Math.min(y,screen.height));
	
	ctx.beginPath();
	ctx.fillStyle = "#000";
	ctx.arc(x,y, radius, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();
	radius += 1;
	ctx.fillStyle = "#A0A";
	ctx.font = "bold 22pt Calibri,Arial,Sans-serif";
	ctx.fillText('Points: ' + Math.round(points) + ' Speed: ' + fluct, 5, 27);
	setTimeout(paint,10);
}

function shoot(event) {
	var a = document.getElementById("canv");
	event.clientX = event.clientX - a.style.left + document.scrollLeft;
	event.clientY = event.clientY - a.style.top + document.scrollTop;
	if (Math.sqrt((event.clientX - x) * (event.clientX - x) + 
					(event.clientY - y) * (event.clientY - y)) < radius) {
		points += 1000 / radius;
		resetBall();
		/* var snd = new Audio("gun-gunshot-01.mp3"); 
		snd.play(); */
	} else {
		/* var snd = new Audio("ricochet.mp3"); 
		snd.play(); */
		points -= radius;
	}
	
	if (points > 100) {
		points = 0;
		fluct += 1;
	}
}

function clear() {
	points = 0;
	radius = 10;
	x = $( screen ).width() / 2;
	y = $( screen ).height() / 2;
	points = 0;
	fluct = 0;
	vx = 0;
	vy = 0;
	alpha = 0;
}


    paint();
    document.getElementById("canv").addEventListener("click", shoot)
	/*$('#canv').click(shoot);
    $('#clear').click(clear);
    */
	document.getElementById('canv').width = screen.width;
    document.getElementById('canv').height = screen.height;
    document.getElementById('canv').style.height = screen.height;
    document.getElementById('canv').style.width = screen.width;