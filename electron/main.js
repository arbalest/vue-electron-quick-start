// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const sourceConfig = {
  type: 'file',
  file: 'electron/index.html',
  url: ''
};

const defaultUrl = '127.0.0.1:3000';

// Get any flags passed through the CLI
process.argv.forEach(function(arg, argIndex, allArgs) {
  if (arg === '--dev') {
    sourceConfig.type = 'url';
    if (sourceConfig.url == '') {
      // Set a default url if we haven't been given one yet
      sourceConfig.url = defaultUrl;
    }
    return;
  }

  if (arg.startsWith('--url')) {
    let pieces = arg.split('=');
    sourceConfig.url = pieces[1];
    return;
  }

  if (arg.startsWith('--index')) {
    let pieces = arg.split('=');
    sourceConfig.file = pieces[1];
  }
});

console.log(sourceConfig);

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.

  if (sourceConfig.type === 'file') {
    mainWindow.loadFile(sourceConfig.file)
  } else {
    mainWindow.loadURL(sourceConfig.url)
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.