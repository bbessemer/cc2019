var index = 0;

var slide_index = 0;
var lesson_index = 0;
var content_index = 0;
var problem_index = 0;

var slide = lessons[lesson_index].slides[0];

// TODO: Implement lesson indexing
// TODO: Implement problem indexing

function PreviousButtonClick()
{
  if (content_index > 0) {
    content_index--;
  } else {
    if (slide_index > 0) {
      slide_index--;
      slide = lessons[0].slides[slide_index];
      content_index = slide.content.length - 1;

      if (slide_index == 0) {
        document.getElementById("PreviousButton").disabled = true;
      }
    }
  }

  if (slide.code) {
    // Set code somewhere
  }

  document.getElementById("NextButton").disabled = false;

  document.getElementById("SlideTitle").innerHTML = slide.title;
  document.getElementById("SlideContent").innerHTML = slide.content[content_index];
}

function NextButtonClick()
{
  if (content_index < slide.content.length - 1) {
    content_index++;
  } else {
    if (slide_index < lessons[0].slides.length - 1) {
      slide_index++;
      content_index = 0;
      slide = lessons[0].slides[slide_index];

      if (slide_index == lessons[0].slides.length - 1) {
        document.getElementById("NextButton").disabled = true;
      }
    }
  }

  if (slide.code) {
    // Set code somewhere
  }

  document.getElementById("PreviousButton").disabled = false;

  document.getElementById("SlideTitle").innerHTML = slide.title;
  document.getElementById("SlideContent").innerHTML = slide.content[content_index];
}
