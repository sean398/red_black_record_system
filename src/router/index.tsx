import React, { useState } from 'react';
import WelcomePage from '../pages/Welcome';
import GamePage from '../pages/Game';

const Router = () => {
    const [stage, setStage] = useState<string>('welcome');

    const stages = ['welcome', 'game'];

    const switchPage = (stage: string) => {
        switch (stage) {
            case 'welcome':
                return (
                    <WelcomePage
                        onGoNext={handleGoNext}
                        onGoBack={handleGoBack}
                    />
                );
                break;
            case 'game':
                return (
                    <GamePage onGoNext={handleGoNext} onGoBack={handleGoBack} />
                );
                break;
        }
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
