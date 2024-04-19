import { TopNav, SideNav } from "../Components"
import { Container } from "react-bootstrap"

const Dashboard = ({children})=>{
    return(
        <>
            <TopNav additionalClasses={`d-md-none`}  />
            <div className="basis-full grow flex">
                <SideNav additionalClasses={`d-none d-md-flex`}/>

                <Container className="pt-10">
                    {children}
                </Container>
            </div>
        </>
    )
}

export default Dashboard;