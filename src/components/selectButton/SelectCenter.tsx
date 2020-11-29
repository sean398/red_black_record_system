import React, {
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
    useState
} from 'react';
import SelectButton from './SelectButton';
import './index.scss';

interface coordinater {
    x: number;
    y: number;
    color: string;
}
interface ISelectCenter {
    groupNumber: number;
}

let SelectCenter: React.FC<ISelectCenter> = ({ groupNumber }) => {
    const [gameArray, setGameArray] = useState<coordinater[][]>([]);
    // const gameArray: coordinater[][] = [];
    // const [score, setScore] = useState<{[key:string]:number}>({});

    useEffect(() => {
        const gameArray: coordinater[][] = [];
        for (let i = 0; i < groupNumber; i++) {
            gameArray.push([] as coordinater[]);
            for (let j = 0; j < groupNumber; j++) {
                gameArray[i].push({ x: i, y: j, color: '#ccc' });
            }
        }
        setGameArray(gameArray);
    }, [groupNumber]);

    const handleButtonChange = (
        actionGruop: number,
        targetGroup: number,
        currentColor: string
    ) => {
        const newGameArray: coordinater[][] = Object.assign(gameArray);
        newGameArray[actionGruop][targetGroup].color = currentColor;
        setGameArray(newGameArray);
    };

    return (
        <div className="select-center-container">
            <div className="select-center-top-title-container">
                {gameArray.map((row, index) => {
                    return (
                        <div
                            key={'top-title' + index}
                            className="select-center-title-item"
                        >{`第${index + 1}组(目标组)`}</div>
                    );
                })}
            </div>
            <div className="select-center-main-container">
                <div className="select-center-title-left-container">
                    {gameArray.map((row, index) => {
                        return (
                            <div
                                key={'left-title' + index}
                                style={{
                                    height: `${100 / groupNumber}%`
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
                                    height: `${100 / groupNumber}%`
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
                                                    color={col.color}
                                                    key={
                                                        'col' + index + secIndex
                                                    }
                                                    disabled={col.x === col.y}
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
