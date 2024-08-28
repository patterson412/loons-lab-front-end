'use client';

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../../globals.css";
import { useTheme } from "next-themes";
import { authCheck } from "@/utils/auth";
import WeatherDataContext from "@/context/weatherData";
//import GradualSpacing from "@/components/magicui/gradual-spacing";
import BlurFade from "@/components/magicui/blur-fade";
import axios from "axios";
import Image from "next/image";


export default function Homegrid() {

    const { weatherData, setWeatherData } = useContext(WeatherDataContext);

    const [areaName, setAreaName] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const updateWeatherData = async () => {
            if (!weatherData) { // Handling the case where weatherData is null or undefined
                console.log('Weather data is null or undefined.');

                try {
                    const response = await axios.get("/api/weather", {
                        params: {
                            lat: "6.927079",
                            lon: "79.861244",
                        }
                    });

                    if (response.data) {
                        setWeatherData(response.data);
                    }
                } catch (error) {
                    console.error("Error from openWeather: ", error);
                }

            } else if (Object.keys(weatherData).length === 0) { // Handle the case where weatherData is an empty object
                console.log('Weather data is an empty object.');
            } else { // Handle the case where weatherData has valid data
                console.log('Weather data:', weatherData);

                try {
                    const response = await axios.get("/api/geo", {
                        params: {
                            lat: "6.927079",
                            lon: "79.861244",
                        }
                    });

                    if (response.data && response.data.length > 0) {
                        console.log(response.data[0].name);
                        setAreaName(response.data[0].name);
                        setLoading(false);
                    }

                } catch (error) {
                    console.error("Error from openWeather: ", error);
                }
            }
        }

        updateWeatherData();

    }, [weatherData]);

    return (
        <div className="h-screen w-full">
            {!loading && (
                <div className="w-full px-4 py-4">
                    <section id="header">
                        <BlurFade delay={0.25} inView>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                {areaName}
                            </h2>
                        </BlurFade>
                        <BlurFade delay={0.5} inView>
                            <div className="flex items-center gap-8">
                                <span className="text-xl text-pretty tracking-tighter sm:text-3xl xl:text-4xl/none">
                                    {`${weatherData?.current?.temp} ° C`}
                                </span>
                                <Image
                                    src={`http://openweathermap.org/img/wn/${weatherData?.current?.weather[0]?.icon}@2x.png`}
                                    alt={weatherData?.current?.weather[0]?.description}
                                    width={50}
                                    height={50}
                                    className="md:w-20 md:h-20 lg:w-32 lg:h-32"
                                    priority
                                />
                            </div>

                        </BlurFade>
                    </section>
                </div>
            )}
        </div>
    );


}