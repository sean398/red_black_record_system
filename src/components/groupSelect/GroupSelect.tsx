import React, { useState } from 'react';
import { Select } from 'antd';
const { Option } = Select;

interface IGroupSelect {
    groupNumber: number;
    currentRound: number;
    gameData: any;
    setGameData: any;
}

const GrouSelect = (props: IGroupSelect) => {
    const { groupNumber, currentRound, gameData, setGameData } = props;

    const zh = [
        '零',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九',
        '十'
    ];

    const handleChange = (value: string, index: number) => {
        const newGameData = Object.assign(gameData);
        if (newGameData[currentRound]) {
            newGameData[currentRound][index] = value;
        } else {
            newGameData[currentRound] = {};
            newGameData[currentRound][index] = value;
        }
        setGameData(newGameData);
    };

    const renderGroupItem = () => {
        const groupArray: string[] = [];
        for (let i = 1; i <= groupNumber; i++) {
            groupArray.push(`第${zh[i]}组`);
        }
        return groupArray.map((title, index) => {
            return (
                <div className="group-item row align-items-center ">
                    <div className="col">{title}</div>
                    <Select
                        className="col"
                        style={{ width: 200 }}
                        value={
                            gameData[currentRound] &&
                            gameData[currentRound][index + 1]
                        }
                        onChange={(value: any) => {
                            handleChange(value, index + 1);
                        }}
                    >
                        <Option value="red">红牌</Option>;
                        <Option value="black">黑牌</Option>;
                    </Select>
                </div>
            );
        });
    };

    return (
        <div className="game-container " key={currentRound}>
            <div className="round-title text-center">{`第${zh[currentRound]}局`}</div>
            {renderGroupItem()}
        </div>
    );
};

export default GrouSelect;
