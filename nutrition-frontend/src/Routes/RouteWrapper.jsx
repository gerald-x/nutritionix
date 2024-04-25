import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RouteWrapper = ({ children }) => {
  const navigate = useNavigate()
  const [tokenValidity, setTokenValidity] = useState(null)
  const { accessToken } = useSelector(state => state.appData)

  useEffect(() => {
    if (!accessToken) {
        navigate("/auth/login")
    }

    // Make a request to validate the token
    const validateToken = async ()=>{
        try {
            const response = await fetch("http://127.0.0.1:5000/auth/token-validate/", {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${accessToken}`
              },
            });
      
            if (!response.ok) {
                navigate("/auth/login")
            } 
            
            setTokenValidity(true)      
        } catch (error) {
            navigate("/auth/login")
        }
    }

    validateToken()
  }, []);

  console.log(accessToken, tokenValidity)
  
  return (
    tokenValidity && (
      children
    )
  );
};

export default RouteWrapper;