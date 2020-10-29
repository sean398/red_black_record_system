const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const { join } = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindowmainWindow = new BrowserWindow({
        width: 1024,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    });
    const urlLocation = isDev
        ? 'http://localhost:3000'
        : `file://${join(__dirname, './build/index.html')}`;

    mainWindowmainWindow.loadURL(urlLocation);
});
