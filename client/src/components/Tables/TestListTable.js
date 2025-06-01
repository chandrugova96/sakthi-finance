import React from 'react';
import { Link } from 'react-router-dom';

const Tables = ({ data, checkedIds, checkOne, checkAll, editOnClick }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th> Exam Title </th>
                        <th> Exam Code </th>
                        <th className='text-center'> A Question / T Question </th>
                        <th className='text-center'> Difficulty Level </th>
                        <th> Added By </th>
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
                                <td> {d.examTitle} </td>
                                <td> {d.examCode} </td>
                                <td className='text-center'>
                                    <Link className="nav-link" to={`/tests-question-assign?id=${d._id}`}>
                                        <button type="button" className="btn btn-gradient-info">
                                            {d.assignedQuestions}/{d.totalQuestions}
                                        </button>
                                    </Link>
                                </td>
                                <td className='text-center'>{d.level.join(', ')}</td>
                                <td> {d.addedBy} </td>
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