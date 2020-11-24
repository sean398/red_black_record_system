import React, { useState } from 'react';

const SelectButton = (props: any) => {
    const { x, y, onChange } = props;
    const [color, setColor] = useState<string>('#ccc');

    const handleButtonClick = (e: any) => {
        if (e.buttons === 1) {
            //left
            setColor('red');
        } else if (e.buttons === 2) {
            //right
            setColor('black');
        }
        onChange(x, y);
    };

    return (
        <div
            data-x={x}
            data-y={y}
            style={{
                background: color
            }}
            onMouseDown={handleButtonClick}
            className="select-center-button"
        >{`${x}+${y}`}</div>
    );
};

export default SelectButton;
