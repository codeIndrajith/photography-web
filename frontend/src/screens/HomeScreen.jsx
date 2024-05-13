// import { Container } from 'react-bootstrap';
import Hero from '../components/Hero';
import Header from '../components/Header';
import Portfolio from '../components/Portfolio';
import LocationsSlider from '../components/LocationsSlider';

const HomeScreen = () => {
  return (
    <>
      <Header />
      <Hero />
      <Portfolio />
      <LocationsSlider />
    </>
  );
};
export default HomeScreen;
