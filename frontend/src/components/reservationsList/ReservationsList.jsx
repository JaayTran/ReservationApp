import React from "react";
import "./reservationList.css";
import useFetch from "../../hooks/useFetch";

const ReservationsList = () => {
  const { data, loading, error } = useFetch("/reservations");

  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data.map((_, i) => (
            <div className="pListItem" key={i}>
              <div className="pListTitles">
                <h1>Party Size: {data[i]?.numPeople}</h1>
                <h1>Name: {data[i]?.name}</h1>
                <h1>Phone: {data[i]?.phone}</h1>
                <h1>Email: {data[i]?.email}</h1>
                <h1>Table Booked: {data[i]?.tableNumber}</h1>
                <h1>Special Notes: {data[i]?.comments}</h1>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ReservationsList;
