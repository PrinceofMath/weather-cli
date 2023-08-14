import chalk from "chalk";
import dedent from "dedent";

const printError = (error) => {
    console.log(chalk.bgRed(" ERROR ") + " " + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen(" SUCCESS ") + " " + message);
};

const printHelp = () => {
    console.log(dedent`
        ${chalk.bgCyan(" HELP ")}
        Without arguments - print current weather
        -s [CITY] set city
        -h print help
        -t set api key
    `);
};

const printWeather = (res) => {
    console.log(dedent`
        ${chalk.bgYellow(" WEATHER ")} city for: ${res.name}
        🌡️  Temperature: ${res.main.temp}
        💨 Wind: ${res.wind.speed}
    `);
};

export { printError, printHelp, printSuccess, printWeather };
