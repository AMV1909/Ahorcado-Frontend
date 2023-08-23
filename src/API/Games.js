import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getGames = async () => {
    return await axios
        .get(API_URL)
        .then((res) => res.data)
        .catch((err) => console.log(err));
};

export const createGame = async (code) => {
    return await axios
        .post(API_URL, { code })
        .then((res) => res.data)
        .catch((err) => console.log(err));
};

export const deleteGame = async (id) => {
    return await axios
        .delete(`${API_URL}/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
};
