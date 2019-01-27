// CLIENT SIDE

window

function SetWindowTitle (name)
{
	document.getElementById("WindowTitle").innerHTML = name;
};

SetWindowTitle("CodeVis");

function OpenDevTools()
{
	window.webContents.openDevTools()
}
