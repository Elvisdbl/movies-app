import axios from "axios";

const URL = 'https://api.themoviedb.org/3';
const NOW_PLAYING = `${URL}/movie/now_playing`;
const POPULAR = `${URL}/movie/popular`

const {
    REACT_APP_API_KEY: API_KEY
} = process.env;

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