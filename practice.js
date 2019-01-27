var lesson = lessons[2];
var slides = lesson.slides;
var slide_index = 0;

function PreviousProblemButtonClick()
{
	if (slide_index > 0) {
		slide_index--;
		ChangeWorkAreaText(lesson.title, slides[slide_index].problem, "", "", slides[slide_index].answer);
	}
}

function NextProblemButtonClick()
{
	if (slide_index < lesson.slides.length - 1) {
		slide_index++;
		ChangeWorkAreaText(lesson.title, slides[slide_index].problem, "", "", slides[slide_index].answer);
	}
}
