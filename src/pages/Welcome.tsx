import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
const { ipcRenderer } = window.require('electron');

const WelcomePage = (props: any) => {
    const { onGoNext } = props;

    const handleClick = () => {
        ipcRenderer.send('open-setting-window', true);
    };

    const handleGameStart = () => {
        onGoNext();
    };

    return (
        <>
            <div className="row rb-welcome">
                <div className="col left-panel"></div>
                <div className="col right-panel"></div>
                <div className="title">红黑游戏</div>
            </div>
            <Footer
                titles={['基本设置', '开始游戏']}
                onFirstButtonClick={handleClick}
                onSecondButtonClick={handleGameStart}
            />
        </>
    );
};

export default WelcomePage;
