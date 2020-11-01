import React, { useState } from 'react';
import WelcomePage from '../pages/Welcome';
import GamePage from '../pages/Game';
import Statisic from '../pages/Statistic';
import '../pages/pages.scss';

const Router = () => {
    const [stage, setStage] = useState<string>('welcome');
    const [groupScore, setGroupStore] = useState<any>({});
    const [gameData, setGameData] = useState<any>({});

    const stages = ['welcome', 'game', 'chart'];

    const switchPage = (stage: string) => {
        switch (stage) {
            case 'welcome':
                return (
                    <WelcomePage
                        onGoNext={handleGoNext}
                        onGoBack={handleGoBack}
                    />
                );
            case 'game':
                return (
                    <GamePage
                        onGoNext={handleGoNext}
                        onGoBack={handleGoBack}
                        groupScore={groupScore}
                        setGroupStore={setGroupStore}
                        gameData={gameData}
                        setGameData={setGameData}
                    />
                );
            case 'chart':
                return (
                    <Statisic
                        onGoNext={handleGoNext}
                        onGoBack={handleGoBack}
                        groupScore={groupScore}
                        onReset={handleReset}
                    />
                );
        }
    };

    const handleReset = () => {
        setStage('welcome');
        setGameData({});
    };

    const handleGoNext = () => {
        const currentIndex = stages.findIndex((item) => item === stage);
        if (stages[currentIndex + 1]) {
            setStage(stages[currentIndex + 1]);
        }
    };
    const handleGoBack = () => {
        const currentIndex = stages.findIndex((item) => item === stage);
        if (stages[currentIndex - 1]) {
            setStage(stages[currentIndex - 1]);
        }
    };

    return <>{switchPage(stage)}</>;
};

export default Router;
