'use client';

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from 'lucide-react';
import "../../globals.css";
import { useTheme } from "next-themes";
import { authCheck } from "@/utils/auth";
import WeatherDataContext from "@/context/weatherData";
//import GradualSpacing from "@/components/magicui/gradual-spacing";
import BlurFade from "@/components/magicui/blur-fade";
import axios from "axios";
import Image from "next/image";
import { MagicCard } from "./magicui/magic-card";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function Homegrid() {

    const { weatherData, setWeatherData } = useContext(WeatherDataContext);

    const { toast } = useToast();

    const { theme, systemTheme } = useTheme();

    const [color, setColor] = useState("#D9D9D955");

    const [areaName, setAreaName] = useState('');

    const [loading, setLoading] = useState(true);

    const [days, setNoDays] = useState(3);
    const [isButtonVisible, setIsButtonVisible] = useState(true);

    const [lat, setLat] = useState('6.927079');
    const [lon, setLon] = useState('79.861244');

    useEffect(() => {

        const updateWeatherData = async () => {
            if (!weatherData) { // Handling the case where weatherData is null or undefined
                console.log('Weather data is null or undefined.');

                try {
                    const response = await axios.get("/api/weather", {
                        params: {
                            lat: "6.927079",
                            lon: "79.861244",
                        },
                    }, { withCredentials: true });

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
                            lat: lat,
                            lon: lon,
                        }
                    }, { withCredentials: true });

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

    useEffect(() => {
        const setColorBasedOnTheme = () => {
            if (theme === 'system') {
                // Check the system preference
                setColor(systemTheme === 'dark' ? "#262626" : "#D9D9D955");
            } else {
                // Direct theme setting
                setColor(theme === "dark" ? "#262626" : "#D9D9D955");
            }
        };

        setColorBasedOnTheme();
        console.log("Current theme:", theme, "Color set to:", color);
    }, [theme, systemTheme]);


    const handleChange = async (event) => {
        event.preventDefault();
        const searchLat = event.target.lat.value;
        const searchLon = event.target.lon.value;

        if (searchLat && searchLon) {
            try {
                const response = await axios.get("/api/weather", {
                    params: {
                        lat: searchLat,
                        lon: searchLon,
                    }
                }, { withCredentials: true });

                if (response.data) {
                    setLat(searchLat);
                    setLon(searchLon);
                    setWeatherData(response.data);
                } else {
                    console.log("bad lat and lon request");
                    toast({
                        title: "Sorry bad lat and lon request",
                        description: response.data.message || 'An error occurred',
                    });
                }
            } catch (error) {
                console.error("Error from openWeather: ", error);
                toast({
                    title: "Sorry bad lat and lon request",
                    description: 'An error occurred',
                });
            }
        } else {
            toast({
                title: "Please enter the values",
                description: 'Empty Lat and Lon',
            });
        }



    }

    const handleViewMoreClick = () => {
        setNoDays(8);
        setIsButtonVisible(false); // Hide the button after clicking
    }

    return (
        <div className="h-screen w-full">
            {!loading && (
                <div className="h-full w-full">
                    <div className="flex flex-col md:flex-row w-full px-16 pt-10 pb-4 gap-8">
                        <section id="header">
                            <BlurFade delay={0.25} inView>
                                <div className="flex">
                                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none justify-center items-center">
                                        {areaName}
                                    </h2>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="size-8 sm:size-12 md:size-16 rounded-full flex items-center justify-center ml-10"
                                            >
                                                <Search className="size-5 sm:size-8 md:size-12" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Search for a Place</DialogTitle>
                                                <DialogDescription>
                                                    Enter valid Latitude and Longitude of the place
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={handleChange}>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="lat" className="text-right">
                                                            Latitude
                                                        </Label>
                                                        <Input
                                                            id="lat"
                                                            defaultValue=""
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="lon" className="text-right">
                                                            Longitude
                                                        </Label>
                                                        <Input
                                                            id="lon"
                                                            defaultValue=""
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit">Save changes</Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>


                                    <span className="text-sm sm:text-base">Search a place</span>

                                </div>


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

                        <BlurFade delay={0.75} inView>
                            <div className="flex items-center justify-center md:items-start md:justify-start border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-lg p-4 bg-white dark:bg-gray-800">
                                <div className="flex flex-col">
                                    <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-black dark:text-white">
                                        Feels Like {weatherData?.current?.feels_like} ° C
                                    </h2>

                                    <ul className="list-disc list-inside space-y-2">
                                        <li className="flex items-center space-x-2">
                                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                            <span className="text-sm sm:text-base md:text-lg lg:text-xl text-black dark:text-gray-300">
                                                High humidity levels {weatherData?.current?.humidity}
                                            </span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                            <span className="text-sm sm:text-base md:text-lg lg:text-xl text-black dark:text-gray-300">
                                                Wind Speeds {weatherData?.current?.wind_speed}
                                            </span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                                            <span className="text-sm sm:text-base md:text-lg lg:text-xl text-black dark:text-gray-300">
                                                Clouds {weatherData?.current?.clouds}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </BlurFade>



                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-10 py-16 px-10">

                        {weatherData?.daily?.slice(0, days).map((element, idx) => (
                            <MagicCard key={idx} className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap" gradientColor={color}>
                                <BlurFade delay={0.25} inView>
                                    <div className="flex flex-col py-3">
                                        <div className="flex justify-center items-center">
                                            <span className="text-sm md:text-base lg:text-lg">{`${new Date(element.dt * 1000).getDate()} Day`}</span>
                                        </div>

                                        <div className="flex items-center gap-8">
                                            <span className="text-xl text-pretty tracking-tighter sm:text-2xl xl:text-2xl/none">
                                                {`${element.temp?.day} ° C`}
                                            </span>
                                            <h2 className="text-lg font-bold tracking-tighter sm:text-xl xl:text-2xl/none">
                                                {element?.weather[0]?.description}
                                            </h2>
                                            <Image
                                                src={`http://openweathermap.org/img/wn/${element.weather[0]?.icon}@2x.png`}
                                                alt={element.weather[0]?.description}
                                                width={50}
                                                height={50}
                                                className="md:w-20 md:h-20 lg:w-32 lg:h-32"
                                                priority
                                            />
                                        </div>

                                    </div>

                                </BlurFade>
                            </MagicCard>
                        ))}

                    </div>


                    <div className="w-full flex justify-center pt-16 pb-8">
                        <BlurFade delay={0.25} inView>
                            {isButtonVisible && (
                                <Button onClick={handleViewMoreClick}>
                                    View More
                                </Button>
                            )}
                        </BlurFade>
                    </div>






                </div>


            )}
        </div>
    );


}