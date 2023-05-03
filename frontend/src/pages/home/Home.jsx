import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import TablesList from '../../components/tablesList/TablesList';

import './home.css';

const Home = () => {
  return (
    <div className="homeContainer">
      <Navbar />
      <Header />
      <div className="homeContentWrapper">
        <p> Tables: </p>
        <TablesList />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
