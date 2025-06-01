import React from 'react';
import { Link } from 'react-router-dom';

const Tables = ({ data, editOnClick, checkedIds, checkOne, checkAll }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th> Category </th>
                        <th className='text-center'> Position </th>
                        <th className='text-center'> Sub Category </th>
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
                                <td> {d.name} </td>
                                <td className='text-center'> {d.position} </td>
                                <td className='text-center'>
                                    <Link className="nav-link" to={`/tests-sub?id=${d._id}`}>
                                        <button type="button" className="btn btn-gradient-info btn-icon">
                                            {d.subCount}
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