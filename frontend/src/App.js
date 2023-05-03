import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import ReserveTable from './pages/reserveTable/ReserveTable';
import TablesList from './components/tablesList/TablesList';
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
