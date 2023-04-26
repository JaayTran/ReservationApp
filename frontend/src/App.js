import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import TablesList from './pages/tablesList/TablesList';
import ReserveTable from './pages/reserveTable/ReserveTable';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tables" element={<TablesList />} />
        <Route path="/tables/:id" element={<ReserveTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
