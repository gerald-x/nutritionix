import { Nav } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { FiLogOut } from "react-icons/fi";

const SideNav = ({additionalClasses})=>{
    const navigate = useNavigate()

    function handleLogout(){
        navigate("/auth/login")
    }

    return(
        <>
            <Nav defaultActiveKey="/" className={`${additionalClasses} flex-column bg-success md:max-[991px]:w-[40%] w-[30%]  lg:w-1/4 py-5 ps-4`} data-bs-theme="dark" >
                <Link to={`/`} className="text-start mb-12">Nutritionix</Link>
                <Nav.Link href="/home">Active</Nav.Link>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
                <Nav.Link eventKey="link-2">Link</Nav.Link>

                <Nav.Link className="mt-12" onClick={handleLogout}>
                    <FiLogOut className="rotate-180" /> Log Out
                </Nav.Link>
            </Nav>
        </>
    )
}

export default SideNav