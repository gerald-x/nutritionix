import { 
    Route,
    Routes, 
    createBrowserRouter, 
    createRoutesFromElements, 
    RouterProvider,
} from "react-router-dom"

import { LoginView, Overview, SignUp } from "../Pages"
import { AuthOutlet } from "../Components"


const router = createBrowserRouter(
    createRoutesFromElements(
            <>
                <Route path="/auth/" element={ <AuthOutlet /> }>
                    <Route index path="login" element={ <LoginView />} />
                    <Route path="signup" element={ <SignUp />} />
                </Route>

                <Route path="/" element={ <Overview /> } />
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


