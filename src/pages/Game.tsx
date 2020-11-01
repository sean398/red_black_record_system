import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import GrouSelect from '../components/groupSelect/GroupSelect';
import { objToArr } from '../utils/data';

const Store = window.require('electron-store');
const settingsStore = new Store({ name: 'Settings' });

const GamePage = (props: any) => {
    const {
        onGoNext,
        onGoBack,
        groupScore,
        setGroupStore,
        gameData,
        setGameData
    } = props;
    const [currentRound, setCurrentRound] = useState<number>(1);
    const [gameSetting, setGameSetting] = useState({
        number: 10,
        group: 3,
        first: 5,
        second: 9
    });

    useEffect(() => {
        const settings = settingsStore.get('setting');
        const newGroupScroe: any = {};
        let group: number;
        if (!settings) {
            group = 3;
            settingsStore.set('setting', gameSetting);
        } else {
            group = settings['group'];
            setGameSetting(settings);
        }
        if (group) {
            for (let i = 1; i <= group; i++) {
                newGroupScroe[i] = 0;
            }
            setGroupStore(newGroupScroe);
        }
    }, []);

    const handleGoback = () => {
        if (currentRound - 1 >= 1) {
            setCurrentRound(currentRound - 1);
        } else {
            setGameData({});
            onGoBack();
        }
    };

    const handleGoNext = () => {
        let isPass = true;
        if (gameData[currentRound]) {
            for (let i = 1; i <= gameSetting['group']; i++) {
                if (!gameData[currentRound][i]) {
                    isPass = false;
                }
            }
        }
        if (!isPass || !gameData[currentRound]) {
            alert('请选择所有的队伍');
        } else if (isPass) {
            if (currentRound + 1 <= gameSetting['number']) {
                const newDataStore = Object.assign(groupScore);
                const data = objToArr(gameData[currentRound]);
                data.forEach((value, bigIndex) => {
                    const isRed = value === 'red';
                    const otherData = data.filter((value, index) => {
                        return index !== bigIndex;
                    });
                    otherData.forEach((value) => {
                        if (isRed) {
                            if (value === 'red') {
                                newDataStore[bigIndex + 1] =
                                    newDataStore[bigIndex + 1] - 5;
                            } else if (value === 'black') {
                                newDataStore[bigIndex + 1] =
                                    newDataStore[bigIndex + 1] + 5;
                            }
                        } else {
                            if (value === 'red') {
                                newDataStore[bigIndex + 1] =
                                    newDataStore[bigIndex + 1] - 5;
                            } else if (value === 'black') {
                                newDataStore[bigIndex + 1] =
                                    newDataStore[bigIndex + 1] + 3;
                            }
                        }
                    });
                });
                console.log(newDataStore);

                setGroupStore(newDataStore);
                setCurrentRound(currentRound + 1);
            } else if (currentRound + 1 >= gameSetting['number']) {
                onGoNext();
            }
        }
    };

    return (
        <>
            <GrouSelect
                groupNumber={gameSetting['group']}
                currentRound={currentRound}
                gameData={gameData}
                setGameData={setGameData}
            />
            <Footer
                titles={['返回', '继续']}
                onFirstButtonClick={handleGoback}
                onSecondButtonClick={handleGoNext}
            />
        </>
    );
};

export default GamePage;
