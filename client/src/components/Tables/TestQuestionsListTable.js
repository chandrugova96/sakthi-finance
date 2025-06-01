import React from 'react';

import { QType } from '../../constants/actionType'

const Tables = ({ data, checkedIds, checkOne, checkAll }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th> Q Type </th>
                        <th> Q Unique Code </th>
                        <th> Question </th>
                        <th> Category </th>
                        <th> Sub Category </th>
                        <th className='text-center'> Difficulty Level </th>
                        <th> Added By </th>
                        <th>
                            <input
                                type='checkbox'
                                checked={data.length && data.length === checkedIds.length}
                                onChange={(e) => checkAll(e.target.checked)}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 && data.map((d, index) => {
                        return (
                            <tr key={index}>
                                <td> {QType[d.type]} </td>
                                <td> {d.uniqueCode} </td>
                                <td> {d.question} </td>
                                <td> {d.mainName} </td>
                                <td> {d.subName} </td>
                                <td className='text-center'>{d.level}</td>
                                <td> {d.addedBy} </td>
                                <td>
                                    <input
                                        type='checkbox'
                                        checked={checkedIds.indexOf(d._id) >= 0}
                                        onChange={() => checkOne(d._id)}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {!data.length &&
                <div className='mt-3 text-center'> No Data</div>
            }
        </div>

    );
}

export default Tables;