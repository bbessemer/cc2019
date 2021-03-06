// SERVER SIDE

const {app, BrowserWindow} = require('electron')

let window

function createWindow()
{
	window = new BrowserWindow({
		width: 1280,
		height: 720,
		autoHideMenuBar: true,
		show: false,
		//icon:"icon.ico",
		icon: "icon.png"
	})

	window.loadFile('presentation.html')
	window.setMenu(null)
	window.webContents.openDevTools()

	//Makes sure to only show the window once the renderer has rendered the first page
	window.once('ready-to-show', () => {
		window.show();
		window.maximize();
	})

	window.on('closed', () => {
		// Derefencing window object will
		window = null
	})
}

// This method will be called when Electron finished initializing
app.on('ready', createWindow)

app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (window === null) {
		createWindow()
	}
})
