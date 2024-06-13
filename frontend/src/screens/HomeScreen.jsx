// import { Container } from 'react-bootstrap';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import LocationsSlider from '../components/LocationsSlider';
import Footer from '../components/Footer';

const HomeScreen = () => {
  return (
    <div className="">
      <Hero />
      <Portfolio />
      <LocationsSlider />
      <Footer />
    </div>
  );
};
export default HomeScreen;
