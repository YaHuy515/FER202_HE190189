import Carousel from "react-bootstrap/Carousel";

function Banner() {
  return (
    <Carousel
      interval={3000}
      controls={true}
      indicators={true}
      pause="hover"
    >
      {/* Slide 1 */}
      <Carousel.Item>
        <img
          className="d-block w-100 banner-image"
          src="/images/banner1.jpg"
          alt="Fashion Collection 2026"
        />

        <Carousel.Caption>
          <h2>FASHION COLLECTION 2026</h2>
          <p>
            Discover the latest fashion trends and styles.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
        <img
          className="d-block w-100 banner-image"
          src="/images/banner2.jpg"
          alt="Summer Sale"
        />

        <Carousel.Caption>
          <h2>SUMMER SALE UP TO 50%</h2>
          <p>
            Enjoy special discounts on selected fashion products.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 3 */}
      <Carousel.Item>
        <img
          className="d-block w-100 banner-image"
          src="/images/banner3.jpg"
          alt="New Arrivals"
        />

        <Carousel.Caption>
          <h2>NEW ARRIVALS</h2>
          <p>
            Explore our newest clothing collection.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;