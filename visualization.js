/*
	visualizer (client-side) script

	API, basically.

	functions for adding stack frame into the view, adding things to a stack frame, and removing existing stack frame

*/

function NewInt ()
{
}

var StackFramesZone = document.getElementById("StackFramesZone");
var BackgroundLightness = true;
function GetBackgroundName ()
{
	return "Background" + (BackgroundLightness ? "Light" : "Dark");
}
var n = 0;
var StackFrames = [];
function NewStackFrame ()
{
	// insert a new element into the page *before* the previous stack frame, and give it an animation that makes its
	// transform's height go from 0% to 100% to visually smoothly push down the previous stack frame.

	var stackframe = document.createElement("div");
	stackframe.className = "StackFrame " + GetBackgroundName();
	BackgroundLightness = !BackgroundLightness;
	if (StackFrames.length >= 1)
	{
		var prev_top = StackFrames[StackFrames.length - 1];
		StackFramesZone.insertBefore(stackframe,prev_top);
	}
	else
	{
		console.log("first");
		StackFramesZone.appendChild(stackframe);
	}
  	//stackframe.classList.add("Expanded");
	stackframe.innerHTML = "frame " + ++n;
	StackFrames[StackFrames.length] = stackframe;
	return stackframe;
}

function PopStack ()
{
	// remove the current stack frame
}
