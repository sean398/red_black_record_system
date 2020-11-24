import React, { useState } from 'react';
import SelectButton from './SelectButton';
import './index.scss';

interface coordinater {
    x: number;
    y: number;
}

const SelectCenter = () => {
    const [group, setGroup] = useState<number>(5);
    const gameArray = [];

    for (let i = 0; i < group; i++) {
        gameArray.push([] as coordinater[]);
        for (let j = 0; j < group; j++) {
            gameArray[i].push({ x: i, y: j });
        }
    }

    const handleButtonChange = (x: number, y: number) => {
        console.log(x, y);
    };

    return (
        <div className="select-center-container">
            <div className="select-center-top-title-container">
                {gameArray.map((row, index) => {
                    return (
                        <div
                            key={'top-title' + index}
                            className="select-center-title-item"
                        >{`第${index + 1}组`}</div>
                    );
                })}
            </div>
            <div className="select-center-main-container">
                <div className="select-center-top-left-container">
                    {gameArray.map((row, index) => {
                        return (
                            <div
                                key={'left-title' + index}
                                style={{
                                    height: `${100 / group}%`
                                }}
                                className="select-center-title-item"
                            >{`第${index + 1}组`}</div>
                        );
                    })}
                </div>
                <div className="select-center-content">
                    {gameArray.map((row, index) => {
                        return (
                            <div
                                className="select-center-row"
                                style={{
                                    height: `${100 / group}%`
                                }}
                                key={'row' + index}
                            >
                                <>
                                    {row.map((col, secIndex) => {
                                        return (
                                            <>
                                                <SelectButton
                                                    x={col.x}
                                                    y={col.y}
                                                    key={
                                                        'col' + index + secIndex
                                                    }
                                                    onChange={
                                                        handleButtonChange
                                                    }
                                                />
                                            </>
                                        );
                                    })}
                                </>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SelectCenter;
