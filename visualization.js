/*
	visualizer (client-side) script

	API, basically.

	functions for adding stack frame into the view, adding things to a stack frame, and removing existing stack frame

*/

/*
var myhtml =
"line1"+
"line2"+
"line3";
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

function NewStackFrame (function_name) // Function name.
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
	var temp = stackframe.offsetWidth; // force browser to do transition for next statement
	stackframe.classList.add("Expanded");
	stackframe.innerHTML = function_name;
	StackFrames[StackFrames.length] = stackframe;
	return stackframe;
}
function DestroyStackFrame ()
{
	BackgroundLightness = !BackgroundLightness;
	var stackframe = StackFrames.pop();
	stackframe.classList.remove("Expanded");
	//stackframe.classList.add("Contract");
	setTimeout(function () { stackframe.remove() }, 1000);

}

function PopStack ()
{
	// remove the current stack frame
}
