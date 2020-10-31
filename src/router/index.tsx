import React, { useState } from 'react';
import WelcomePage from '../pages/Welcome'

const Router = () => {
    const [stage, setStage] = useState<string>('welcome')

    return <WelcomePage />
};

export default Router
