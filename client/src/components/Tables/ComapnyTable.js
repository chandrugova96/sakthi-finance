import React from "react";
import moment from "moment";

const Tables = ({ data, editOnClick }) => {
  return (
    <div className='table-responsive'>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th> Name </th>
            <th> Email </th>
            <th> Mobile Number </th>
            <th> Date </th>
            <th> Edit </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((d, index) => {
              return (
                <tr key={index}>
                  <td> {d.name} </td>
                  <td> {d.email} </td>
                  <td> {d.mobileNumber} </td>
                  <td> {moment(d.createdAt).format("DD/MM/YYYY")} </td>
                  <td>
                    <i
                      className='mdi mdi-border-color cursor-pointer'
                      onClick={() => editOnClick(d)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {!data.length && <div className='mt-3 text-center'> No Data</div>}
    </div>
  );
};

export default Tables;
