import { Nav } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { FiLogOut } from "react-icons/fi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdTrackChanges } from "react-icons/md"
import { useDispatch } from "react-redux";
import { clearTokens } from "../Store/appSlice";
import useLogout from "../Hooks/useLogout";
import { useState } from "react";

const SideNav = ({additionalClasses})=>{
    const navigate = useNavigate()
    const [click, setClick] = useState(false)

    const handleLogout = () => {
        setClick(true)
    }

    useLogout(click)

    return(
        <>
            <Nav defaultActiveKey="/" className={`${additionalClasses} flex-column bg-success md:max-[991px]:w-[40%] w-[30%]  lg:w-1/4 py-5 ps-4`} data-bs-theme="dark" >
                <Link to={`/`} className="text-start text-white fs-3 mb-12 dancing-script-font">Nutritionix</Link>
                <Nav.Link href="/" className="text-white hover:text-white-50">
                    <div className="d-flex align-items-center">
                        <AiOutlineUnorderedList className="me-2" />Overview
                    </div>
                </Nav.Link>

            
                <Nav.Link href="/track-weight" className="flex my-3 text-white">
                    <div className="d-flex align-items-center ">
                        <MdTrackChanges className="me-2" /> Tracker
                    </div>                    
                </Nav.Link>

                <Nav.Link className="mt-12 text-white" onClick={handleLogout}>
                    <div className="d-flex align-items-center">
                        <FiLogOut className="me-2" /> Log Out
                    </div>
                </Nav.Link>
            </Nav>
        </>
    )
}

export default SideNav