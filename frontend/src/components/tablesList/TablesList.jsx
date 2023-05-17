import React from 'react';
import './tablelist.css';
import useFetch from '../../hooks/useFetch';

const TablesList = () => {
  const { data, loading, error } = useFetch('/tablenumbers');

  return (
    <div className="pList">
      {loading ? (
        'loading'
      ) : (
        <>
          {data.map((_, i) => (
            <div className="pListItem" key={i}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdZRzBL62-pJDUluAgcMC2joOfMh6nNS-Pdg&usqp=CAU"
                alt=""
                className="pListImg"
              />
              <div className="pListTitles">
                <h1>{data[i]?.tableNum}</h1>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TablesList;
