
function CreateCodeArea(w = 800, h = 600, text = '')
{
	var area = {
		//Variables
		'width' : w,
		'height' : h,
		'code' : text,
		'editorRef' : null,
		//Provide this function with an iframe and text to fill the editor with
		'CreateEditor' : function(divName, text)
		{
			var div = document.getElementById(divName)
			div.width = area.width;
			div.height = area.height;
			div.innerHTML = text;

			editorRef = ace.edit(divName);
	    editorRef.setTheme("ace/theme/monokai");
	    editorRef.session.setMode("ace/mode/c_cpp");
			editorRef.getSession().setUseWorker(false);
			editorRef.width = area.width.toString() + "px";
			//document.getElementById(divName + '-section').width = area.width.toString() + "px";
			document.getElementById(divName).height = area.height.toString() + "px";
			//document.getElementById(divName + '-section').height = area.height.toString() + "px";
			editorRef.resize();
		},

		'GetText' : function()
		{
			if (editorRef === null) console.log("ERROR: editorRef of CodeArea was null!");
			return editorRef.getValue();
		},

		'SetText' : function(code)
		{
			if (editorRef === null) console.log("ERROR: editorRef of CodeArea was null!");
			editorRef.setValue(code);
		}
	};

	return area;
}
