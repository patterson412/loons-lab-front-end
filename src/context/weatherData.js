'use client';

import { createContext, useState } from "react";

const WeatherDataContext = createContext();

export function WeatherDataProvider({ children }) {
    const [weatherData, setWeatherData] = useState(null);
    return (
        <WeatherDataContext.Provider value={{ weatherData, setWeatherData }}>
            {children}
        </WeatherDataContext.Provider>
    );
}


export default WeatherDataContext;