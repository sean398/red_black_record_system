import React, { useEffect, useState } from 'react';
import './footer.scss';

interface IFooter {
    titles: string[];
    onFirstButtonClick: () => void;
    onSecondButtonClick: () => void;
}

const Footer = (props: IFooter) => {
    const { onFirstButtonClick, onSecondButtonClick, titles } = props;
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsShow(true);
        }, 1000);
    }, []);

    const handleFirstClick = () => {
        onFirstButtonClick();
    };

    const handleSecondClick = () => {
        onSecondButtonClick();
    };

    return (
        <>
            {isShow && (
                <div className="d-flex justify-content-between row btn-container">
                    <button
                        className="col button btn btn-info"
                        type="button"
                        onClick={handleFirstClick}
                    >
                        {titles[0]}
                    </button>
                    <button
                        style={{ marginLeft: '10px' }}
                        className="col button btn btn-info"
                        type="button"
                        onClick={handleSecondClick}
                    >
                        {titles[1]}
                    </button>
                </div>
            )}
        </>
    );
};

export default Footer;
