import {Navigate} from "react-router-dom" // Importing the Navigate component from react-router-dom
import {jwtDecode} from "jwt-decode" // Importing the jwtDecode function from jwt-decode library
import api from "../api" // Importing the api module from ../api
import {REFRESH_TOKEN, ACCESS_TOKEN} from "../constants" // Importing constants REFRESH_TOKEN and ACCESS_TOKEN from ../constants
import { useState, useEffect } from "react";
import {
    set
} from "../../../env/lib/python3.12/site-packages/django/contrib/admin/static/admin/js/vendor/xregexp/xregexp.js"; //Importing usestate and useeffect component from react

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)// State variable to keep track of authorization status

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, []);

    // Function to refresh the access token
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN) // Get the refresh token from localStorage
        try {
            const res = await api.post("/api/token/refresh/", { // Send a POST request to the refresh token endpoint
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access) // If the request is successful, store the new access token in localStorage
                setIsAuthorized(true) // Set isAuthorized to true
            } else {
                setIsAuthorized(false) // If the request fails, set isAuthorized to false
            }
        } catch (error) {
            console.log(error) // Log any errors
            setIsAuthorized(false) // Set isAuthorized to false in case of an error
        }
    }
    // Function to check if the user is authorized
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN) // Retrieve the access token from localStorage

        if (!token) {
            setIsAuthorized(false) // If no access token found, set isAuthorized to false
            return
        }
        const decoded = jwtDecode(token) // Decode the access token
        const tokenExpiration = decoded.exp // Get the token expiration timestamp
        const now = Date.now() / 1000 // Get the current timestamp in seconds

        if (tokenExpiration < now) {
            await refreshToken()  // If the token has expired, refresh the token
        } else {
            setIsAuthorized(true) // If the token is still valid, set isAuthorized to true
        }
    }
    // If isAuthorized is null, show a loading indicator
    if (isAuthorized === null) {
        return <div>Loading...</div>
    }
    // If the user is authorized, render the children components
    // Otherwise, navigate to the login page
    return isAuthorized ? children : <Navigate to={"/login"}/>
}

export default ProtectedRoute