import { 
    Route,
    Routes, 
    createBrowserRouter, 
    createRoutesFromElements, 
    RouterProvider,
} from "react-router-dom"

import { LoginView, Overview, SignUp, WeightTracker } from "../Pages"
import { AuthOutlet } from "../Components"
import RouteWrapper from "./RouteWrapper"


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/auth/" element={ <AuthOutlet /> }>
                <Route index path="login" element={ <LoginView />} />
                <Route path="signup" element={ <SignUp /> } />
            </Route>

            <Route path="/" element={ <RouteWrapper children={<Overview />} /> } />
            <Route path="/track-weight" element={ <RouteWrapper children={<WeightTracker />} /> } />
        </>
    )
)

const RouteStore = () => {
    return(
        <RouterProvider 
            router={router}
        />
    )
}

export default RouteStore


