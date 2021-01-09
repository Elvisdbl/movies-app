import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Movie from '../../components/components/Movie';
import { Container, Carousel, Navbar, Form ,FormControl } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Home() {
    const API_KEY = "96a1b3764e5654a82e0ee8f34ad97731";
    const API_IMG = "https://image.tmdb.org/t/p/original/";
    const API_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

    const [nowPlaying, setNowPlaying] = useState([]);
    const [popular, setPopular] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    const getNowPlaying = () => {
        Axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
            params: {
                api_key: API_KEY
            }
        })
            .then(res => {
                setNowPlaying(res.data.results);
                console.log(res);
            })
            .catch(e => console.log(e));
    };

    const getPopular = (API) => {
        Axios.get(API)
            .then(res => {
                setPopular(res.data.results);
                console.log(res);
            })
            .catch(e => console.log(e));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (searchTerm) {
            getPopular(API_SEARCH + searchTerm);
            setSearchTerm('');
        }
    };

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }

    useEffect(
        () => {
            getNowPlaying();
            getPopular(API_POPULAR); // This is the thing that i need to change
        }, [API_POPULAR]);

    const slider = nowPlaying.slice(0, 3).map(
        (item, id) => {
            return (
                <Carousel.Item key={id}>
                    <Link to={`/movie/${item.id}`}> <img src={API_IMG + item.backdrop_path} alt={item.title} /></Link>
                    <Carousel.Caption style={{ background: '#302f2fa1' }}>
                        <h3>{item.title}</h3>
                        <p >{item.overview}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            )
        }
    );

    return (
        <Container>

            <Navbar className="d-flex justify-content-between" bg="light" variant="light">
                <Navbar.Brand href="/">TheMovies</Navbar.Brand>
                <Form onSubmit={handleOnSubmit}>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchTerm} onChange={handleOnChange} />
                </Form>
            </Navbar>

            <Carousel
                keyboard={true}
                nextLabel=""
                prevLabel=""
                fade={true}
            >
                {slider}
            </Carousel>

            <div className="container-fluid row">
                {
                    popular.map(
                        movie => (<Movie key={movie.id} {...movie} />)
                    )
                }
            </div>

        </Container>
    );
}

export default Home;