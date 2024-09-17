import axios from "axios";

// Получение данных о матче
export const fetchMatchesAPI = async () => {
    const response = await axios.get(
        'https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4328'
    );
    return response.data.events;
};