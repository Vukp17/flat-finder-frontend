import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Apartments.css";

const ITEMS_PER_PAGE = 25;
const TOTAL_APARTMENTS = 500;

interface Apartment {
  id: number;
  name: string;
  locality: string;
  price: string;
  images: string[];
}

interface ApartmentsProps {
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

function Apartments({ currentPage, onPageChange }: ApartmentsProps) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [totalPages] = useState(Math.ceil(TOTAL_APARTMENTS / ITEMS_PER_PAGE));

  useEffect(() => {
    async function fetchApartments() {
      const response = await fetch(
        `http://localhost:3000/apartments?page=${currentPage}`
      );
      const data = await response.json();
      setApartments(data);
    }
    fetchApartments();
  }, [currentPage]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="apartment-list">
      {apartments.map((apartment) => (
        <div key={apartment.id} className="apartment">
          <h2 className="title">{apartment.name}</h2>
          <Slider {...settings}>
            {apartment.images.slice(0, 3).map((image, index) => (
              <div key={index}>
                <img className="image" src={image} alt={apartment.name} />
              </div>
            ))}
          </Slider>
          <p className="location">{apartment.locality}</p>
          <p className="price">{apartment.price}</p>
        </div>
      ))}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Apartments;
