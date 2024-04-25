import { Nav } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { FiLogOut } from "react-icons/fi";
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
                <Link to={`/`} className="text-start mb-12">Nutritionix</Link>
                <Nav.Link href="/">Overview</Nav.Link>
                <Nav.Link href="/track-weight" eventKey="link-1">Tracker</Nav.Link>
                <Nav.Link eventKey="link-2">Link</Nav.Link>

                <Nav.Link className="mt-12" onClick={handleLogout}>
                    <FiLogOut className="rotate-180" /> Log Out
                </Nav.Link>
            </Nav>
        </>
    )
}

export default SideNav