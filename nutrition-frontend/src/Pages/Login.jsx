import healthBackground from "../Assets/health-bg.jpg" 
import { LoginForm } from '../Components'


const LoginView = ()=>{
    return(
        <>
            <div style={{
                backgroundImage: ` url(${healthBackground})`
            }}

            className='bg-fixed w-screen h-screen bg-center bg-no-repeat bg-cover flex justify-center items-center'
            >
                <div className="rounded-lg w-4/5 lg:w-1/2 bg-white h-75 p-6 grid overflow-auto">
                    <h3 className='text-center h-max'>Nutritionix</h3>

                    <div className="w-4/5 mx-auto">
                        <LoginForm/>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default LoginView