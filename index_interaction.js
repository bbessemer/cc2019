// CLIENT SIDE

window

function SetWindowTitle (name)
{
	document.getElementById("WindowTitle").innerHTML = name;
};

SetWindowTitle("window name, nice stuff man.");

function OpenDevTools()
{
	window.webContents.openDevTools()
}
