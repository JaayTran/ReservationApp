import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Tables from './pages/tables/Tables';
import Reservations from './pages/reservations/Reservations';
import Navbar from './components/navbar/Navbar';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/reservations/" element={<Reservations />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
