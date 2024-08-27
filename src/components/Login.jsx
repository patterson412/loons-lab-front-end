'use client';

import React, { useEffect, useState, useContext } from "react";
import "../../globals.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authCheck } from "@/utils/auth";
import { CoolMode } from "./magicui/cool-mode";
import Particles from "./magicui/particles";
import { useTheme } from "next-themes";


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BorderBeam } from "./magicui/border-beam";
import { useToast } from "./ui/use-toast";



export default function Login() {

    const router = useRouter();
    const { toast } = useToast();
    const [showContent, setShowContent] = useState(false);

    const { theme, systemTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        const checkAuth = async () => {
            console.log(theme);
            const passed = await authCheck();
            if (passed) {
                router.push("/home");
            } else {
                setShowContent(true);
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        const setColorBasedOnTheme = () => {
            if (theme === 'system') {
                // Check the system preference
                setColor(systemTheme === 'dark' ? "#ffffff" : "#000000");
            } else {
                // Direct theme setting
                setColor(theme === "dark" ? "#ffffff" : "#000000");
            }
        };

        setColorBasedOnTheme();
        console.log("Current theme:", theme, "Color set to:", color);
    }, [theme, systemTheme]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            const result = await axios.post("/api/login", { // Error codes 400 and 401 get thrown to the catch block by axios
                username: username,
                password: password,
            });

            if (result.status === 200) {
                console.log(result.data.message);
                toast({
                    title: "Login Successfull",
                    description: result.data.message || 'An error occurred',
                });
                router.push("/home");
            }
        } catch (error) {
            console.error('Login error:', error);
            toast({
                title: "Login Error",
                description: error.response?.data?.message || 'An error occurred',
            });
        }



    }

    if (!showContent) {

        return null;
    }


    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">

            <Particles
                className="absolute inset-0"
                quantity={100}
                ease={80}
                color={color}
                refresh={true}
            />


            <Card className="w-4/5 lg:w-3/5 h-3/5 relative flex flex-col justify-between shadow-[0_0_30px_5px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_5px_rgba(255,255,255,0.1)] overflow-hidden"> {/* using custom shadows for a more soft spread out */}
                <div className="flex w-full justify-center pt-4">
                    <Image
                        src="/images/cloud.png"
                        alt="Loons Labs Logo"
                        width={100}
                        height={100}
                        priority
                    />
                </div>

                <CardHeader>
                    <CardTitle>My Weather Login</CardTitle>
                    <CardDescription>Enter Your credentials</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="loginForm" onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div>
                                <label htmlFor="username">Username</label>
                                <Input id="username" placeholder="username" required />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <Input id="password" placeholder="password" required />
                            </div>
                        </div>
                    </form>

                </CardContent>
                <CardFooter className="relative flex justify-end">

                    <CoolMode>
                        <Button type="submit" form="loginForm">submit</Button>
                    </CoolMode>

                </CardFooter>
                <BorderBeam />
            </Card>

        </div>

    );
}