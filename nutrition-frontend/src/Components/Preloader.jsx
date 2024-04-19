import "animate.css"
import { useEffect, useState } from "react"
import { PacmanLoader } from "react-spinners"

export default function Preloader({loading=true}){
    /* The prop returns loading as false. Which is why when checking you use '!loading' */
    const [visibility, setVisibility] = useState(true)

    useEffect(()=>{
        setTimeout(()=>{
            setVisibility(false)
        }, 2100)
    }, [loading])
    return(
        <div className={`${!loading && "animate__animated animate__fadeOut animate__delay-1s animate__slow"} ${!visibility && 'hidden'} bg-[#FFFFFF] absolute top-0 start-0 right-0 z-[1000] w-screen h-screen flex justify-center items-center`}>
            <PacmanLoader color="#4CAF50" size={40} />
        </div>
    )
}