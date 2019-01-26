//Simple functions that create struct-like objects for our programming concepts

//Generates HTML or returns info about what the desired slide is
function ConstructPageFromSlideIndex(slide, index)
{
	if (slide.type == 'concept')
	{
		//Construct appropriate html here
	}
	else
	{
		//Construct appropriate html here
	}
}

//opening refers to the text at the beginning/top of the slide
//code refers to the code to show the user
//explanation is the text for explanations of the code/coding concept
//Use arrays of code and explanation to make multiple "steps" in a slide
//Each variable should have the same number of elements in the array
function CreateConceptSlide(opening, code, explanation)
{
	var slide =
	{
		'type' : "concept",
		'opening_text' : opening,
		'code_text' : code,
		'explanation_text' : explanation
	};

	return slide;
};

//question refers to the problem given to the user
//brief refers to a brief version of the question/concept/whatever
//answer refers to the correct syntax to check (if we need it)
function CreateProblemSlide(question, brief, answer)
{
	var slide =
	{
		'type' : "problem",
		'question_text' : question,
		'brief_text' : brief,
		'answer_text' : answer,
		'hints_text' : hints
	};

	return slide;
};
