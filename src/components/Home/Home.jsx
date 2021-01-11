import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Movie from '../../components/components/Movie';
import { Container, Carousel } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Home(match) {
    console.log(match);
    let searchTerm = match.searchTerm;
    console.log(searchTerm);
    const API_KEY = "96a1b3764e5654a82e0ee8f34ad97731";
    const API_IMG = "https://image.tmdb.org/t/p/original/";
    const API_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    // const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
    const [nowPlaying, setNowPlaying] = useState([]);
    const [popular, setPopular] = useState([]);

    const getNowPlaying = () => {
        Axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
            params: {
                api_key: API_KEY
            }
        })
            .then(res => {
                setNowPlaying(res.data.results);
            })
            .catch(e => console.log(e));
    };

    const getPopular = (API) => {
        Axios.get(API)
            .then(res => {
                setPopular(res.data.results);
            })
            .catch(e => console.log(e));
    };

    useEffect(
        () => {
            const Fetch = () => {
                getNowPlaying();
                getPopular(API_POPULAR); // This is the thing that i need to change
            }
            Fetch();
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