import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'


const IMG_API = "https://image.tmdb.org/t/p/original/";


const Movie = ({ title, poster_path, overview, id }) => (
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={(poster_path ? (IMG_API + poster_path) : 'https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569_960_720.jpg')} alt={title} />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{overview.slice(0, 125)}...</Card.Text>
            <Button variant="primary"><Link to={`/movie/${id}`}>Go {title}</Link></Button>
        </Card.Body>
    </Card>
);

export default Movie;