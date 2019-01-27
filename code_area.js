
function CreateCodeArea(w = 600, h = 480, text = '')
{
	var area = {
		//Variables
		'width' : w,
		'height' : h,
		'code' : text,
		'editorContainer' : null,
		'editorRef' : null,
		//Provide this function with an iframe and text to fill the editor with
		'CreateEditor' : function(divName, container, text)
		{
			editorContainer = container;

			editorContainer = document.getElementById(divName)
			editorContainer.width = area.width;
			editorContainer.height = area.height;
			editorContainer.innerHTML = text;

			console.log("Editor dims: " + area.width + ", " + area.height);

			editorRef = ace.edit(divName);
	    editorRef.setTheme("ace/theme/monokai");
	    editorRef.session.setMode("ace/mode/c_cpp");
			editorRef.getSession().setUseWorker(false);
			editorRef.getSession().setUseWrapMode(false);

			editorContainer.style.width = area.width.toString() + "px";
			editorContainer.style.height = area.height.toString() + "px";
			editorRef.resize();
		},

		'Resize' : function(w, h)
		{
			area.width = w;
			area.height = h;

			editorContainer.style.width = area.width.toString() + "px";
			editorContainer.style.height = area.height.toString() + "px";

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
