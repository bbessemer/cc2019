let correctAnswer = '';
var index = 0;
var lesson = lessons[2];

function ChangeWorkAreaText(title, problem, infotitle, info, desired)
{
	document.getElementById('TaskTitle').innerHTML = title;
	document.getElementById('TaskDescription').innerHTML = problem;
	document.getElementById('InfoTitle').innerHTML = infotitle;
	document.getElementById('InfoText').innerHTML = info;
	correctAnswer = desired;
}

ChangeWorkAreaText(lesson.title, lesson.slides[0].problem, "", "", lesson.slides[0].answer);

var EntireCodeView = document.getElementById("EntireCodeView");
var EntireInfoView = document.getElementById("EntireInfoView");

function ShowCodeView()
{
	EntireCodeView.style = "transform: translateX(0%)";
	EntireInfoView.style = "transform: translateX(calc(-100% + 25px))";
}

function ShowInfoView()
{
	EntireCodeView.style = "transform: translateX(calc(25% - 40px))";
	EntireInfoView.style = "transform: translateX(0%)";
}

var IsOnCodeView = true;

document.getElementById('TabButton').onclick = function()
{
	if (IsOnCodeView) ShowInfoView();
	else ShowCodeView();
	IsOnCodeView = !IsOnCodeView;
}

document.getElementById('NextButton').onclick = function ()
{
	if (index < lesson.slides.length - 1) {
		index++;
	}
	ChangeWorkAreaText(lesson.title, lesson.slides[index].problem, "", "", lesson.slides[index].answer);
}
