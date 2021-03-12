import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_IMG = "https://image.tmdb.org/t/p/original/";

const Slider = ({ title, backdrop_path,overview, id }) => (
  <Carousel.Item>
    <Link to={`/movies-app/movie/${id}`}>
      <img
        className="d-block w-100"
        src={
          backdrop_path
            ? API_IMG + backdrop_path
            : "https:cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569_960_720.jpg"
        }
        alt={title}
      />
    </Link>
    <Carousel.Caption style={{ background: "#302f2fa1" }}>
      <h3>{title}</h3>
      <p>{overview}</p>
    </Carousel.Caption>
  </Carousel.Item>
);

export default Slider;
