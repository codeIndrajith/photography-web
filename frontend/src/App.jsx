import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header />
      <ToastContainer />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
