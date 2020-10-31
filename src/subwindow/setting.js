const { remote, ipcRenderer, ipcMain } = window.require('electron');
const Store = require('electron-store');
const settingsStore = new Store({ name: 'Settings' });

const $ = (selector) => {
    const result = document.querySelectorAll(selector);
    return result.length > 1 ? result : result[0];
};

document.addEventListener('DOMContentLoaded', () => {
    const numberInput = $('.number');
    const groupNumberInput = $('.group');
    const firstWeightingInput = $('.firstWeighting');
    const secondWeightingInput = $('.secondWeighting');
    const settingData = settingsStore.get('setting');
    const form = $('#settings-form');
    if (settingData) {
        numberInput.setAttribute('value', settingData['number']);
        groupNumberInput.setAttribute('value', settingData['group']);
        firstWeightingInput.setAttribute('value', settingData['first']);
        secondWeightingInput.setAttribute('value', settingData['second']);
    }
    form.addEventListener('submit', (e) => {
        const newSetting = {
            number: numberInput.value,
            group: groupNumberInput.value,
            first: firstWeightingInput.value,
            second: secondWeightingInput.value
        };
        console.log(newSetting);
        settingsStore.set('setting', newSetting);
        remote.getCurrentWindow().close();
    });
});
