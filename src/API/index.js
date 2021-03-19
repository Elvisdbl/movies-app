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
        console.log("NowPlaying");
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
        console.log("Popular");
        return data.results;

    } catch (e) {
        console.log(e);
    }
}

export const getSearch = async (searchTerm) => {
    try {
        const res = axios.get(API_SEARCH, {
            params: {
                api_key: API_KEY,
                query: searchTerm
            }
        });
        console.log("getSearch");
        console.log(res);
        return res;
    } catch (e) {
        console.log(e);
    }
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
        console.log("Details");
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
        console.log("Similar");
        return data.results;

    } catch (e) {
        console.log(e);
    }
}