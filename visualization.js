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
var BackgroundLightness = false;
function GetBackgroundName ()
{
	return "Background" + (BackgroundLightness ? "Light" : "Dark");
}
var n = 0;
var StackFrames = [];

// force browsers to pay attention to what classes the element has.
// call this before adding something that should then be transitioned to
function ForceRecalculate (dom_element)
{
	var temp = dom_element.offsetWidth;
}

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

	stackframe.className = "StackFrame " + GetBackgroundName();
	ForceRecalculate(stackframe);
	stackframe.classList.add("Expanded");

	//stackframe.innerHTML = function_name;
	StackFrames[StackFrames.length] = stackframe;


	var name_obj = document.createElement("div");
	name_obj.className = "FuncName";
	name_obj.innerHTML = function_name;
	stackframe.appendChild(name_obj);

	var out = {
		element:stackframe,
		items:[],
		current_height:100/*px*/,
	};

	return out;//stackframe;
}
function DestroyStackFrame ()
{
	BackgroundLightness = !BackgroundLightness;
	var stackframe = StackFrames.pop();
	stackframe.classList.remove("Expanded");
	//stackframe.classList.add("Contract");
	setTimeout(function () { stackframe.remove() }, 1000);

}
var STACKFRAME_ITEMS_PER_ROW = 12;
var STACKFRAME_HEIGHT_GROWTH = 50;
var Colors = [
	"ff8080",
	"c880ff",
	"80ff80",
	"80a2ff",
	"d0ff80",

];
var NextColorID = 0;
function GetNextColor ()
{
	var color = Colors[NextColorID];
	if (++NextColorID >= Colors.length) NextColorID = 0;
	return color;
}
function NewFrameItem (stackframe)
{
	if (stackframe.items % STACKFRAME_ITEMS_PER_ROW == 0)
	{
		stackframe.current_height += STACKFRAME_HEIGHT_GROWTH;
		stackframe.style = "height: " + stackframe.current_height + "px;";
	}
	var stackitem = document.createElement("div");
	stackframe.element.appendChild(stackitem);
	stackitem.className = "StackItem";
	stackitem.style = "background-color: #" + GetNextColor() + ";";
	ForceRecalculate(stackitem);
	stackitem.classList.add("FadedIn");

	return stackitem;
}

function PopStack ()
{
	// remove the current stack frame
}
