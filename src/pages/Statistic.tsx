import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { objToArr } from '../utils/data';

const ChartPage = (props: any) => {
    const { groupScore, onReset } = props;
    const [dataSource, setDataSource] = useState<any[]>([]);

    useEffect(() => {
        const newDataSource = objToArr(groupScore).map((score, index) => {
            return {
                key: index + 1,
                name: `第${index + 1}组`,
                score: score
            };
        });
        setDataSource(newDataSource);
    }, []);

    const handleReset = () => {
        onReset();
    };

    const columns = [
        {
            title: '组名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '得分',
            dataIndex: 'score',
            key: 'score'
        }
    ];

    return (
        <>
            <div className="chart-page">
                <div className="chart-title text-center">每组得分</div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
            <div className="d-flex justify-content-end reset-button">
                <button
                    style={{
                        margin: '20px'
                    }}
                    type="submit"
                    onClick={handleReset}
                    className="btn btn-danger"
                >
                    重新开始
                </button>
            </div>
        </>
    );
};

export default ChartPage;
