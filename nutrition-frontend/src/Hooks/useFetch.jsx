import { useState } from "react";
import { useSelector } from "react-redux";

const useFetch = () => {
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    const {accessToken} = useSelector(state => state.appData)
  
    const fetchData = async (url, auth=false) => {
        setIsLoading(true);
        const extras = auth ? {Authorization: `Bearer ${accessToken}`} : {}

        console.log(auth, extras)
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: extras
            });
            const jsonData = await response.json();

            setIsLoading(false);
            if (!response.ok) {
                setError(jsonData.msg)
                throw new Error(`HTTP error! status: ${response.status}. Details: ${jsonData.msg}`);
            } else {
                setData(jsonData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };
  
    return {data, isLoading, error, fetchData};
};

export default useFetch