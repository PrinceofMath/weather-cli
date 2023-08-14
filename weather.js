#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import {
    printError,
    printHelp,
    printSuccess,
    printWeather,
} from "./services/log.service.js";
import {
    TOKEN_DICTIONARY,
    getKeyValue,
    saveKeyValue,
} from "./services/storage.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError("Token not passed");
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess("Token saved!!!");
    } catch (e) {
        printError(e.message);
    }
};

const saveCity = async (city) => {
    if (!city.length) {
        printError("City not passed");
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess("City saved!!!");
    } catch (e) {
        printError(e.message);
    }
};

const getForecast = async () => {
    try {
        const city =
            process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
        const weather = await getWeather(city);
        printWeather(weather);
    } catch (error) {
        if (error?.response?.status === 404) {
            printError("City is incorrect");
        } else if (error?.response?.status === 401) {
            printError("Token is invalid");
        } else {
            printError(error.message);
        }
    }
};

const initCLI = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        printHelp();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }

    getForecast();
};

initCLI();
