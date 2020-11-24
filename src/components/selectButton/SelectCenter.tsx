import React, { useState } from 'react';
import './index.scss';

interface coordinater {
    x: number;
    y: number;
}

const SelectCenter = () => {
    const [group, setGroup] = useState<number>(3);
    const gameArray = [];

    for (let i = 0; i < group; i++) {
        gameArray.push([] as coordinater[]);
        for (let j = 0; j < group; j++) {
            gameArray[i].push({ x: i, y: j });
        }
    }

    return (
        <div className="select-center-container">
            {gameArray.map((row) => {
                return (
                    <div
                        className="select-center-row"
                        style={{
                            height: `${100 / group}%`
                        }}
                    >
                        {row.map((col) => {
                            return (
                                <div className="select-center-button">{`${col.x}+${col.y}`}</div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default SelectCenter;
