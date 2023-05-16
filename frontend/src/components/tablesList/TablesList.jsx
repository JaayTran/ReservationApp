import React from "react";
import "./tablelist.css";
import useFetch from "../../hooks/useFetch";

const TablesList = () => {
  const { data, loading, error } = useFetch("/");

  return (
    <div className="pList">
      <div className="pListItem">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdZRzBL62-pJDUluAgcMC2joOfMh6nNS-Pdg&usqp=CAU"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>A1</h1>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdZRzBL62-pJDUluAgcMC2joOfMh6nNS-Pdg&usqp=CAU"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>A2</h1>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdZRzBL62-pJDUluAgcMC2joOfMh6nNS-Pdg&usqp=CAU"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>A3</h1>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdZRzBL62-pJDUluAgcMC2joOfMh6nNS-Pdg&usqp=CAU"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>A4</h1>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdZRzBL62-pJDUluAgcMC2joOfMh6nNS-Pdg&usqp=CAU"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>B1</h1>
        </div>
      </div>
    </div>
  );
};

export default TablesList;
