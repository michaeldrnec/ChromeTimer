function PlayAlarm() {
	var audio = new Audio('alarm_1.mp3');
	audio.play();
}
function UpdateClock()
{
	countdown--;
	$("#clock").text(ConvertTime(countdown));
	if (countdown <= 0) {
		window.clearInterval(timer);
	}
}

function ConvertTime(t) 
{
	var h = Math.floor(t / 3600);
	t %= 3600;
	var m = Math.floor(t / 60);
	var s = t % 60;
	return (h < 10 ? '0' + h : h)
	+ ':' + (m < 10 ? '0' + m : m) 
	+ ':' + (s < 10 ? '0' + s : s);
}

$(document).ready(function() {
	$(clock).text(ConvertTime(countdown));
	$("#start").bind('click', function() { if (timer == null) {timer = window.setInterval(UpdateClock, 1000); } });
	$("#stop").bind('click', function() { window.clearInterval(timer); timer = null; });
});

var countdown = 70;
var timer;
