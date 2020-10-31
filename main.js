const { app, ipcMain, ipcRenderer } = require('electron');
const isDev = require('electron-is-dev');
const { join } = require('path');
const AppWindow = require('./src/AppWindow');

let mainWindow;
let settingWindow;

app.on('ready', () => {
    const urlLocation = isDev
        ? 'http://localhost:3000'
        : `file://${join(__dirname, './build/index.html')}`;

    mainWindow = new AppWindow(
        {
            width: 1024,
            height: 700
        },
        urlLocation
    );
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    //hook up
    ipcMain.on('open-setting-window', () => {
        const settingLocation = `file://${join(
            __dirname,
            './src/subwindow/index.html'
        )}`;

        settingWindow = new AppWindow(
            {
                width: 600,
                height: 500,
                parent: mainWindow
            },
            settingLocation
        );
        settingWindow.on('closed', () => {
            mainWindow = null;
        });
    });
});
