import React, { useEffect, useState } from 'react';
import './pages.scss';
const fs = window.require('fs');
const { ipcRenderer } = window.require('electron');

const WelcomePage = () => {
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsShow(true);
        }, 1000);
    }, []);

    const handleClick = () => {
        ipcRenderer.send('open-setting-window', true);
    };

    return (
        <>
            <div className="row rb-welcome">
                <div className="col left-panel"></div>
                <div className="col right-panel"></div>
                <div className="title">红黑游戏</div>
                {isShow && (
                    <button
                        className="row button btn btn-info"
                        type="button"
                        onClick={handleClick}
                    >
                        基本设置
                    </button>
                )}
            </div>
        </>
    );
};

export default WelcomePage;
