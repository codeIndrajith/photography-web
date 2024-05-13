import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import mainImage from '../images/main.jpg';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';

const Hero = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Col>
          <div>
            <img src={mainImage} class="img-fluid h-screen" alt="" />
          </div>
          <Row className="mt-5">
            <div
              id="carouselExampleAutoplaying"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src={img1} class="d-block w-100" alt="" />
                </div>
                <div class="carousel-item">
                  <img src={img2} class="d-block w-100" alt="" />
                </div>
                <div class="carousel-item">
                  <img src={img3} class="d-block w-100" alt="" />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default Hero;
