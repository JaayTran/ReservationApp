import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import ReserveTable from "./pages/reserveTable/ReserveTable";
import Tables from "./pages/tables/Tables";
import Reservations from "./pages/reservations/Reservations";
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/tables/:id" element={<ReserveTable />} />
        <Route path="/reservations/" element={<Reservations />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
