import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
// const { remote, ipcRenderer } = window.require('electron');
const Store = window.require('electron-store');
const settingsStore = new Store({ name: 'Settings' });

const GamePage = (props: any) => {
    const { onGoNext, onGoBack } = props;
    const settings = settingsStore.get('setting');

    if (!settings) {
        const newSetting = {
            number: 10,
            group: 3,
            first: 5,
            second: 9
        };
        settingsStore.set('setting', newSetting);
    }

    const handleGoback = () => {
        onGoBack();
    };
    const handleGoNext = () => {
        onGoNext();
    };

    return (
        <>
            game
            <Footer
                titles={['返回', '继续']}
                onFirstButtonClick={handleGoback}
                onSecondButtonClick={handleGoNext}
            />
        </>
    );
};

export default GamePage;
