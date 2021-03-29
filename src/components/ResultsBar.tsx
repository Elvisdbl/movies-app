import React from "react";
import { Link } from "react-router-dom";
import '../styles/ResultsBar.css';
import { useDispatch } from "react-redux";
import { hideBar } from "../store/actions";

const API_IMG = "https://image.tmdb.org/t/p/original/";

type Props = {
  title: string,
  poster_path: string,
  overview: string,
  id : number,
  release_date: string
};

const ResultsBar = ({ title, poster_path, release_date, id }:Props) => {
  const dispatch = useDispatch();

  const diplayHide = () => {
    dispatch(hideBar());
  };
  
  return(
  <Link
    to={`/movies-app/movie/${id}`}
    className="resultSearch"
    onClick={diplayHide}
  >
    <img
      src={
        poster_path
          ? API_IMG + poster_path
          : "https://cdn.pixabay.com/photo/2016/12/14/23/08/page-not-found-1907792_960_720.jpg"
      }
      alt={title}
    />
    <div className="description">
      <p>{title}</p>
      <p>{release_date.slice(0, 4)}</p>
    </div>
  </Link>
)};

export default ResultsBar;
