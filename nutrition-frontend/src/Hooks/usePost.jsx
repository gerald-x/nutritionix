import { useState } from "react";
import { useSelector } from "react-redux";

const usePost = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    const {accessToken} = useSelector(state => state.appData)

    const postData = async (url, payload, auth=false) => {
      setIsLoading(true);
      const extras = {Authorization: `Bearer ${accessToken}`} ? auth : {}
      try {
        const response = await fetch(url, {
            method: "POST",
            headers: extras,
            body: JSON.stringify(payload)
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
        setError(error)
      }
    };
  
    return {data, isLoading, error, postData};
};

export default usePost