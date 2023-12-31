import axios from "axios";
import { TOKEN_DICTIONARY, getKeyValue } from "./storage.service.js";

const getWeather = async (city) => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error("Token not set, set with -t command");
    }

    const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
            params: {
                q: city,
                appid: token,
                lang: "ru",
                units: "metric",
            },
        }
    );
    return data;
};

export { getWeather };
