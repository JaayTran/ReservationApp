import { useContext, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import ReservationsList from "../../components/reservationsList/ReservationsList";
import TablesList from "../../components/tablesList/TablesList";

import "./home.css";
import { ViewContext } from "../../context/ViewContext";

const Home = () => {
  const { activeView } = useContext(ViewContext);
  return (
    <div className="homeContainer">
      <Navbar />
      <Header />
      {activeView === "tables" && (
        <div className="homeContentWrapper">
          <p>Tables:</p>
          <TablesList />
        </div>
      )}
      {activeView === "reservations" && (
        <div className="homeContentWrapper">
          <p>Reservations:</p>
          <ReservationsList />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
