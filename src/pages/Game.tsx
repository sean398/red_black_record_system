import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';

const GamePage = (props: any) => {
    const { onGoNext, onGoBack } = props;

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
