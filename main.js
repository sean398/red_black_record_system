const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

let mainWindow;

app.on('ready', () => {
    mainWindowmainWindow = new BrowserWindow({
        width: 1024,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    });
    const urlLocation = isDev ? 'http://localhost:3000' : 'test';
    mainWindowmainWindow.loadURL(urlLocation);
});
