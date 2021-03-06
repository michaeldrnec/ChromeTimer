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

function ConvertTimeMili(t) 
{
	var mili = Math.floor((t % 1000) / 100);
	t = Math.floor(t / 1000)
	var h = Math.floor(t / 3600);
	t %= 3600;
	var m = Math.floor(t / 60);
	var s = t % 60;
	return (h < 10 ? '0' + h : h)
	+ ':' + (m < 10 ? '0' + m : m) 
	+ ':' + (s < 10 ? '0' + s : s) + ('.' + mili);
}

function StartStopwatch() {
	if (timer == null) {
		stopwatchStartTime = new Date().getTime();
		timer = window.setInterval(UpdateStopwatch, 100);
	}
}
function StopStopwatch() {
	if (timer != null) {
		elapsedTime += Math.floor(new Date().getTime() - stopwatchStartTime);
		window.clearInterval(timer);
		timer = null;
		$('#stopwatch').text(ConvertTimeMili(elapsedTime));
	}
}

function UpdateStopwatch() {
	$('#stopwatch').text(ConvertTimeMili(elapsedTime + Math.floor(new Date().getTime() - stopwatchStartTime)));
}

function ResetStopwatch() {
	elapsedTime = 0;
	if (timer != null) {
		window.clearInterval(timer);
		timer = null;
	}
	$("#stopwatch").text("00:00:00.0");
}

function StartGame() {
	if (timer == null) {
		gameFirstActive = true;
		gameStartTime = new Date().getTime();
		window.setInterval(UpdateGame, 100);
	}
}

function UpdateGame() {
	var curTime = new Date().getTime() - gameStartTime;
	if (gameFirstActive) {
		$("#gameClock1").text(ConvertTimeMili(gameElapsed1 + curTime));
		$("#gameClock2").text(ConvertTimeMili(gameElapsed2));
	} else {
		$("#gameClock1").text(ConvertTimeMili(gameElapsed1));
		$("#gameClock2").text(ConvertTimeMili(gameElapsed2 + curTime));
	}
}

function SwitchGame() {
	var curTime = new Date().getTime();
	var elapsedTime = curTime - gameStartTime;
	if (gameFirstActive) {
		gameElapsed1 += elapsedTime;
	} else {
		gameElapsed2 += elapsedTime;
	}
	gameStartTime = curTime;
	gameFirstActive = !gameFirstActive
	UpdateGame();
}

function PokerStart() {
	if (timer == null) {
		pokerRoundTime = 5000;
		$('#poker').text(ConvertTimeMili(pokerRoundTime));
		pokerStartTime = new Date().getTime();
		window.setInterval(PokerUpdate, 100);
	}	
}

function PokerUpdate() {
	var curTime = new Date().getTime() - pokerStartTime;
	var newTime = pokerRoundTime * pokerRound - curTime;
	if (newTime > 0) {
		$('#poker').text(ConvertTimeMili(newTime));
	} else {
		pokerRound += 1;
		pokerBigBlind *= 2;
		$('#round').text(pokerRound);
		$('#blinds').text(pokerBigBlind / 2 + '/' + pokerBigBlind);
		$('#poker').text(ConvertTimeMili(pokerRoundTime * pokerRound - curTime));
	}
}

$(document).ready(function() {
//	$(clock).text(ConvertTime(countdown));
	$("#start").bind('click', function() { if (timer == null) {timer = window.setInterval(UpdateClock, 1000); } });
	$("#stop").bind('click', function() { window.clearInterval(timer); timer = null; });
	$("#startStopwatch").bind('click', StartStopwatch);
	$("#stopStopwatch").bind('click', StopStopwatch);
	$("#resetStopwatch").bind('click', ResetStopwatch);
	$("#gameStart").bind('click', StartGame);
	$("#gameSwitch").bind('click', SwitchGame);
	$("#pokerStart").bind('click', PokerStart);
});

var countdown = 70;
var timer;
var stopwatchStartTime;
var stopwatchElapsed;
var elapsedTime = 0;
var gameStartTime;
var gameFirstActive = true;
var gameElapsed1 = 0;
var gameElapsed2 = 0;
var pokerRoundTime = 0;
var pokerStartTime = 0;
var pokerRound = 1;
var pokerBigBlind = 10;