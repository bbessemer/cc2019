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
var INITIAL_STACKFRAME_HEIGHT = 120;
var INITIAL_STACKFRAME_ITEMCREATE_YPOS = 30;
var STACKFRAME_HEIGHT_GROWTH = 80;
// top and bottom padding of 30 px, height of 60 px.
// 30 px, 60 px, 30 px = 120 px initial ; 20 between rows = grow by 60+20=80 px
var STACKFRAME_ITEMS_PER_ROW = 8;
var STACKFRAME_ITEM_WIDTH_PROPORTION = 1.0 / (STACKFRAME_ITEMS_PER_ROW + 2);


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
	stackframe.style = "height: " + INITIAL_STACKFRAME_HEIGHT + "px;";

	//stackframe.innerHTML = function_name;
	StackFrames[StackFrames.length] = stackframe;


	var name_obj = document.createElement("div");
	name_obj.className = "FuncName";
	name_obj.innerHTML = function_name;
	stackframe.appendChild(name_obj);

	var out = {
		element:stackframe,
		items:[],
		current_height:INITIAL_STACKFRAME_HEIGHT/*px*/,
		current_xpos:STACKFRAME_ITEM_WIDTH_PROPORTION,
		current_ypos:INITIAL_STACKFRAME_ITEMCREATE_YPOS/*px*/,
	};

	return out;//stackframe;
}
function DestroyStackFrame ()
{
	BackgroundLightness = !BackgroundLightness;
	var stackframe = StackFrames.pop();
	stackframe.classList.remove("Expanded");
	stackframe.style = "";
	//stackframe.classList.add("Contract");
	setTimeout(function () { stackframe.remove() }, 1000);

}

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
function NewFrameItem (stackframe, variable_name)
{
	if (stackframe.items % STACKFRAME_ITEMS_PER_ROW == 0 && stackframe.items != 0)
	{
		stackframe.current_height += STACKFRAME_HEIGHT_GROWTH;
		stackframe.current_ypos += STACKFRAME_HEIGHT_GROWTH;
		stackframe.current_xpos = STACKFRAME_ITEM_WIDTH_PROPORTION;
		stackframe.style = "height: " + stackframe.current_height + "px;";
	}
	var stackitem = document.createElement("div");
	stackframe.element.appendChild(stackitem);
	stackitem.className = "StackItem";

	var ItemName = document.createElement("div");
	ItemName.className = "StackItemNameBox";
	stackitem.appendChild(ItemName);

	var ItemNameText = document.createElement("div");
	ItemNameText.className = "StackItemName";
	ItemName.appendChild(ItemNameText);

	var ItemValue = document.createElement("div");
	ItemValue.className = "StackItemValueBox";
	stackitem.appendChild(ItemValue);

	var ItemValueText = document.createElement("div");
	ItemValueText.className = "StackItemValue";
	ItemValue.appendChild(ItemValueText);

	ItemValue.style["background-color"] = "#" + GetNextColor();

	ItemNameText.innerHTML = variable_name;
	ItemValueText.innerHTML = "0";

	stackitem.style.top = stackframe.current_ypos + "px";
	stackitem.style.left = stackframe.current_xpos * 100 + "%";
	stackitem.style.width = STACKFRAME_ITEM_WIDTH_PROPORTION * 100 + "%";
	stackframe.current_xpos += STACKFRAME_ITEM_WIDTH_PROPORTION;
	console.log("next left will be " + stackframe.current_xpos);
	ForceRecalculate(stackitem);
	stackitem.classList.add("FadedIn");

	return ItemValueText;
}
