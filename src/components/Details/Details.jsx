import React, { useState, useEffect } from 'react';
import Axios from 'axios';


export function Detail({ match }) {
    console.log(match);
    // const API_KEY =`96a1b3764e5654a82e0ee8f34ad97731`;
    const [details, setDetails] = useState([]);
    const API_IMG = `https://image.tmdb.org/t/p/original/`;
    useEffect(() => {
        Axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=96a1b3764e5654a82e0ee8f34ad97731`)
            .then(res => {
                console.log(res.data);
                setDetails(res.data);
            })
            .catch(e => console.log(e));
    }, [match]);

    return (
        <div>
            <h1>{details.title}</h1>
            <img src={API_IMG + details.poster_path} alt={details.title} />
            <p>{details.overview}</p>
            <span>{details.vote_average}</span>
            <p>{details.original_language}</p>

            {/* <p>{details.genres.map((movie) => (<p key={movie.id}>{movie.name}</p>))}</p> */}
        </div>
    );
}

export default Detail;