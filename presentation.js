var index = 0;

var slide_index = 0;
var lesson_index = 0;
var content_index = 0;
var problem_index = 0;

var lesson = lessons[lesson_index];
var slide = lesson.slides[0];

// TODO: Implement lesson indexing
// TODO: Implement problem indexing

function PreviousButtonClick()
{
  if (content_index > 0) {
    content_index--;
  } else if (slide_index > 0) {
    slide_index--;
    slide = lesson.slides[slide_index];
    content_index = slide.content.length - 1;
  } else if (lesson_index > 0) {
    lesson_index--;
  }

  if (content_index == 0 && slide_index == 0 && lesson_index == 0) {
    document.getElementById("PreviousButton").disabled = true;
  }

  if (slide.code) {
    codeArea.SetText(slide.code);
  }

  document.getElementById("NextButton").disabled = false;
  document.getElementById("LessonTitle").innerHTML = lesson.title;
  document.getElementById("SlideTitle").innerHTML = slide.title;
  document.getElementById("SlideContent").innerHTML = slide.content[content_index];
}

function NextButtonClick()
{
  if (content_index < slide.content.length - 1) {
    content_index++;
  } else if (slide_index < lesson.slides.length - 1) {
    slide_index++;
    content_index = 0;
    slide = lesson.slides[slide_index];
  } else if (lesson_index < lessons.length - 2) {
    lesson_index++;
    slide_index = 0;
    content_index = 0;
    lesson = lessons[lesson_index];
    slide = lesson.slides[slide_index];
  }

  if (slide.code) {
    codeArea.SetText(slide.code);
  }

  document.getElementById("LessonTitle").innerHTML = lesson.title;
  document.getElementById("SlideTitle").innerHTML = slide.title;
  document.getElementById("SlideContent").innerHTML = slide.content[content_index];

  if (content_index == slide.content.length - 1 &&
    slide_index == lesson.slides.length - 1 &&
    lesson_index == lessons.length - 2) {
    document.getElementById("NextButton").disabled = true;
  }

  document.getElementById("PreviousButton").disabled = false;
}
