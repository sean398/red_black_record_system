import React, { useEffect, useState } from 'react';

const SelectButton = (props: any) => {
    const { x, y, color, disabled, onChange } = props;
    const [currentColor, setColor] = useState<string>(color);

    const handleButtonClick = (e: any) => {
        if (disabled) return;
        if (e.buttons === 1 && currentColor !== 'red') {
            //left
            onChange(x, y, 'red');
            setColor('red');
        } else if (e.buttons === 2 && currentColor !== 'black') {
            //right
            onChange(x, y, 'black');
            setColor('black');
        }
    };

    return (
        <div
            style={{
                background: currentColor,
                cursor: disabled ? 'not-allowed' : 'pointer'
            }}
            onMouseDown={handleButtonClick}
            className="select-center-button"
        >{`${x}+${y}`}</div>
    );
};

export default SelectButton;
