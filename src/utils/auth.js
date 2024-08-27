import axios from "axios";

export const isAccessExpired = async () => {
    try {
        const response = await axios.get("/api/validate-access", { withCredentials: true }); // the option ensures the cookie is included in cross origin requests

        if (response.status === 200) {
            console.log(response.data.message);
            return false;
        }
    } catch (error) {
        return true;    // Error codes 400 and 401 get thrown to the catch block by axios
    }
    

}


export const authCheck = async () => {

    const expired = await isAccessExpired();

    if (expired) {
        return false;
    }

    return true;

}