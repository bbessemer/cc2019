//Simple functions that create struct-like objects for our programming concepts

//code refers to the code to show the user
//explanation is the explanation of the code/coding concept
//Use arrays of code and explanations to make multiple "steps" in a slide
function createConceptSlide(code, explanation)
{
  var slide =
  {
    'slide_type' : "concept",
    'code_text' : code,
    'explanation_text' : explanation
  };

  return slide;
};

//question refers to the problem given to the user
//answer refers to the correct syntax to check (if we need it)
function createProblemSlide(question, answer)
{
  var slide =
  {
    'slide_type' : "problem",
    'question_text' : question,
    'answer_text' : answer
  };

  return slide;
};
