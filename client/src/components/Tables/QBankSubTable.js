import React from 'react';
import { Link } from 'react-router-dom';

const Tables = ({ mainCat, data, editOnClick, checkedIds, checkOne, checkAll }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th> Main Category </th>
                        <th> Category </th>
                        <th> Unique Code </th>
                        <th className='text-center'> Questions </th>
                        <th> Edit </th>
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
                                <td> {mainCat.name} </td>
                                <td> {d.name} </td>
                                <td> {d.uniqueCode} </td>
                                <td className='text-center'>
                                    <Link className="nav-link" to={`/question-bank-list?id=${d._id}&mainId=${d.mainId}`}>
                                        <button type="button" className="btn btn-gradient-info btn-icon">
                                            {d.questionsCount}
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <i className='mdi mdi-border-color cursor-pointer' onClick={() => editOnClick(d)} />
                                </td>
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