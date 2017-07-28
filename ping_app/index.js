const electron = require('electron');

// module to control application life
const app = electron.app;

// module to create native browser window
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// keep global reference to window object at it will closed when garbage collector is called
let mainWindow

function createWindow() {
    // Create a new browser window
    mainWindow = new BrowserWindow({ width: 800, height: 600, icon: __dirname + '/media/icon.png' })

    // load index.html in  the app
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }))

    // open dev windows
    mainWindow.webContents.openDevTools()

    // emitted weh window is closed
    mainWindow.on('closed', function() {
        // dereference the window object
        mainWindow = null
    })

}



/* 
This method will be called when electron finishes initialization
and ready to create browser window
Some API can be only used after this event occurs
*/
app.on('ready', createWindow)

// quit when all windows are closed
app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    /* 
    On OSX it is common to recreate window in a app when dock
    icon is clicked and there is no other window open
    */
    if (mainWindow === null) {
        createWindow()
    }
})