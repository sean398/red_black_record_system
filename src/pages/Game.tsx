import React, { useEffect, useState, useRef } from 'react';
import Footer from '../components/Footer/Footer';
import GrouSelect from '../components/groupSelect/GroupSelect';
import { Input, Modal } from 'antd';
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
    const [modalVisable, setModalVisable] = useState<boolean>(false);
    const weight = useRef<number>(2);
    const trueRound = useRef<number>(1);
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

    useEffect(() => {
        if (
            trueRound.current == gameSetting.first ||
            trueRound.current == gameSetting.second
        ) {
            setModalVisable(true);
        }
    }, [trueRound.current]);

    // for next release
    // useEffect(() => {
    //     const groupScoreArr =objToArr(groupScore);
    //     const max = Math.max(...groupScoreArr)
    //     const min = Math.min(...groupScoreArr)
    //     // {objToArr(groupScore).map((score, index) => {
    //     //     return (
    //     //         <div className="score-item">
    //     //             <div>{`第${index + 1}组得分`}</div>
    //     //             <Input value={score} disabled />
    //     //         </div>
    //     //     );
    //     // })}
    // }, [groupScore]);

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
            if (trueRound.current === currentRound) {
                const newDataStore = Object.assign(groupScore);
                const data = objToArr(gameData[currentRound]);
                data.forEach((value, bigIndex) => {
                    const isRed = value === 'red';
                    const otherData = data.filter((value, index) => {
                        return index !== bigIndex;
                    });
                    otherData.forEach((value) => {
                        // 权重
                        let roundWeight = 1;
                        if (
                            gameSetting['first'] &&
                            gameSetting['first'] == currentRound
                        ) {
                            roundWeight = weight.current;
                        } else if (
                            gameSetting['second'] &&
                            gameSetting['second'] == currentRound
                        ) {
                            roundWeight = weight.current;
                        }
                        if (isRed) {
                            if (value === 'red') {
                                newDataStore[bigIndex + 1] =
                                    newDataStore[bigIndex + 1] -
                                    5 * roundWeight;
                            } else if (value === 'black') {
                                newDataStore[bigIndex + 1] =
                                    newDataStore[bigIndex + 1] +
                                    5 * roundWeight;
                            }
                        } else {
                            if (value === 'red') {
                                newDataStore[bigIndex + 1] =
                                    newDataStore[bigIndex + 1] -
                                    5 * roundWeight;
                            } else if (value === 'black') {
                                newDataStore[bigIndex + 1] =
                                    newDataStore[bigIndex + 1] +
                                    3 * roundWeight;
                            }
                        }
                    });
                });
                setGroupStore(newDataStore);
                trueRound.current = trueRound.current + 1;
            }
            setCurrentRound(currentRound + 1);
            if (currentRound + 1 > gameSetting['number']) {
                onGoNext();
            }
        }
    };

    const handleOk = (e: any) => {
        setModalVisable(false);
    };
    const handleCancel = () => {
        setModalVisable(false);
    };

    const handleChangeCurrentWeight = (e: any) => {
        weight.current = +e.target.value;
    };

    return (
        <>
            <GrouSelect
                groupNumber={gameSetting['group']}
                currentRound={currentRound}
                gameData={gameData}
                setGameData={setGameData}
            />
            <div className="score-container d-flex justify-content-start">
                {objToArr(groupScore).map((score, index) => {
                    return (
                        <div className="score-item">
                            <div>{`第${index + 1}组得分`}</div>
                            <Input value={score} disabled />
                        </div>
                    );
                })}
            </div>
            <Footer
                titles={['返回', '继续']}
                onFirstButtonClick={handleGoback}
                onSecondButtonClick={handleGoNext}
            />
            <Modal
                title="请设置本局权重"
                visible={modalVisable}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消"
            >
                <Input
                    defaultValue={weight.current}
                    onChange={handleChangeCurrentWeight}
                />
            </Modal>
        </>
    );
};

export default GamePage;
