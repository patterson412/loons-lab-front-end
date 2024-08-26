'use client';

import React, { useEffect, useState, useContext } from "react";
import "../../globals.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";


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



export default function Login() {

    const handleSubmit = (event) => {
        event.preventDefault();


    }


    return (
        <div className="h-screen w-full flex items-center justify-center">
            <Card className="w-1/2 relative">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
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
                <CardFooter className="flex justify-end">
                    <Button type="submit" form="loginForm">submit</Button>
                </CardFooter>
                <BorderBeam />
            </Card>
        </div>

    );
}