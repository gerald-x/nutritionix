import { Navbar, Container, Offcanvas, Nav, NavDropdown } from "react-bootstrap"
import { FiLogOut } from "react-icons/fi";
import useLogout from "../Hooks/useLogout";
import { useState } from "react";


const TopNav = ({additionalClasses})=>{
    const [click, setClick] = useState(false)

    const handleLogout = () => {
        setClick(true)
    }

    useLogout(click)
    return(
        <>
            <Navbar expand={false} className={`${additionalClasses} bg-body-tertiary mb-3`}>
                <Container fluid>
                    <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar`} />
                    
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-md`}
                        aria-labelledby={`offcanvasNavbarLabel`}
                        placement="start"
                        className="bg-success"
                        data-bs-theme="dark"
                    >
                    
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel`}>
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="#action1">Home</Nav.Link>
                                <Nav.Link href="#action2">Link</Nav.Link>
                                
                                <NavDropdown
                                    title="Dropdown"
                                    id={`offcanvasNavbarDropdown-expand-md`}
                                >
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                    
                                    <NavDropdown.Divider />
                                    
                                    <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                                </NavDropdown>
                                
                                <Nav.Link className="mt-12" onClick={handleLogout}>
                                    <FiLogOut className="rotate-180" /> Log Out
                                </Nav.Link>
                            </Nav>

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}

export default TopNav