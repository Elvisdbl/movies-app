import axios from "axios";

const {
    REACT_APP_API_KEY: API_KEY
} = process.env;

const URL = 'https://api.themoviedb.org/3';
const NOW_PLAYING = `${URL}/movie/now_playing`;
const POPULAR = `${URL}/movie/popular`
const MOVIEURL = `${URL}/movie`;
const API_SEARCH = `${URL}/search/movie`;

export const getNowPlaying = async () => {
    try {
        const {
            data
        } = await axios.get(NOW_PLAYING, {
            params: {
                api_key: API_KEY,
            }

        });
        return data.results;

    } catch (e) {
        console.log(e);
    }
};

export const getPopular = async () => {
    try {
        const {
            data
        } = await axios.get(POPULAR, {
            params: {
                api_key: API_KEY,
            }

        });
        return data.results;

    } catch (e) {
        console.log(e);
    }
}

export const getSearch = async (searchTerm) => {
    const {
        data
    } = await axios.get(API_SEARCH, {
        params: {
            api_key: API_KEY,
            query: searchTerm
        }
    });
    return data.results;
}

// Details 

export const getMoviesDetail = async (id) => {
    try {
        const {
            data
        } = await axios.get(`${MOVIEURL}/${id}`, {
            params: {
                api_key: API_KEY,
            }
        });
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const getSimiliarMovies = async (id) => {
    try {
        const {
            data
        } = await axios.get(`${MOVIEURL}/${id}/similar`, {
            params: {
                api_key: API_KEY,
            }

        });
        return data.results;

    } catch (e) {
        console.log(e);
    }
}