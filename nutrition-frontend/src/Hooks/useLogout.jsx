import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearTokens } from "../Store/appSlice"
import { useEffect } from "react"


const useLogout = (click = false) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if (click){
            dispatch(clearTokens())
            navigate("/auth/login")
        }
    }, [click])
    
}

export default useLogout