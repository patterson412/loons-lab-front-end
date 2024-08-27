import axios from "axios";

const expire = 15 * 60 * 1000; // 15 minutes in milliseconds

export const createAccess = (username) => {
    const trimmedUsername = username.trim();

    const now = new Date();
    const expiryTime = new Date(now.getTime() + expire); // This is 15 minutes in milliseconds added to the current time

    const accessData = {
        username: trimmedUsername,
        expiryTime: expiryTime.toISOString()
    };

    localStorage.setItem('access', JSON.stringify(accessData));
    
}


export const isAccessExpired = () => {
    const accessString = localStorage.getItem('access');

    if (!accessString) {
        return true;
    }

    try {
        const access = JSON.parse(accessString);
        const expiryWhen = new Date(access.expiryTime);

        return expiryWhen.getTime() < Date.now();

    } catch (error) {
        console.error("Error checking the access");
        //localStorage.removeItem('access');
        return true;
    }

}


export const authCheck = () => {
    
    const expired = isAccessExpired();

    if (expired) {
        localStorage.removeItem('access');
        return false;
    }

    return true;

}