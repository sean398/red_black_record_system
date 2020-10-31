const { remote, ipcRenderer, ipcMain } = window.require('electron');
// const Store = require('electron-store');
// const settingsStore = new Store({ name: 'Settings' });

const $ = (selector) => {
    const result = document.querySelectorAll(selector);
    return result.length > 1 ? result : result[0];
};

document.addEventListener('DOMContentLoaded', () => {
    console.log($('#settings-form'));
    $('#settings-form').addEventListener('submit', (e) => {
        console.log($('.email').value);
        console.log($('.password').value);
        console.log(remote);
    });
});
