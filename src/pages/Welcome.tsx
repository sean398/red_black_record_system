import React, { useEffect, useState } from 'react';
import { ipcMain } from 'electron';
import './pages.scss';

const WelcomePage = () => {
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsShow(true);
        }, 1000);
    }, []);

    const handleClick = () => {
        ipcMain.emit('open-setting-window');
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
