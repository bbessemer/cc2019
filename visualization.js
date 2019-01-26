/*
	visualizer (client-side) script

	API, basically.

	functions for adding stack frame into the view, adding things to a stack frame, and removing existing stack frame

*/

function NewInt ()
{
}

var StackFramesZone = document.getElementById("StackFramesZone");
var TopLevelStackFrame = null;
function NewStackFrame ()
{
	// insert a new element into the page *before* the previous stack frame, and give it an animation that makes its
	// transform's height go from 0% to 100% to visually smoothly push down the previous stack frame.

	var stackframe = document.createElement("div");
	stackframe.className = "StackFrame";
	if (TopLevelStackFrame === null)
	{
		StackFramesZone.appendChild(stackframe);
		TopLevelStackFrame = stackframe;
	}
	else
	{
		TopLevelStackFrame.insertBefore(stackframe);
	}
  	element.classList.add("Expanded");
	return stackframe;
}

function PopStack ()
{
	// remove the current stack frame
}
