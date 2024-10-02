import { useState } from "react";
import { doSignInWithEmailAndPassword, doSignInWithGoogle, doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";
import Google from '../icons/Google.png' 
import useLogin from "../hooks/useLogin";
const Login = () => {
    const { userLoggedIn } = useAuth();
    
    const { handleSubmit, handleGoogle, handleEmail, handlePassword, handleLoginRegister, handleConfirmPassword, success, errorMessage, isLogin} = useLogin();

    return (
        <div className="Center-div Vertical-flex Login-div">
            {(userLoggedIn || success) && <Navigate to={'/dashboard'} replace={true} />}
            <h3 className="Login-header">Plan your trips with ease.</h3>
            {errorMessage && <p className="Error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{width: '300px'}}>
                    <input type="email" className="form-control mt-3" placeholder="Enter Email" onChange={handleEmail}/>
                    <input type="password" className="form-control mt-3" placeholder="Enter Password" onChange={handlePassword}/>
                    {!isLogin && <input type="password" className="form-control mt-3" placeholder="Confirm Password" onChange={handleConfirmPassword}/>}
                </div>
                <div className="Flex-evenly mt-3">
                    {isLogin && <button type='submit' role="submit" className="btn btn-outline-primary" style={{color: 'black'}} >Login</button>}
                    {isLogin && <button type='button' className="btn btn-outline-primary" style={{color: 'black'}} onClick={handleLoginRegister}>Register</button>}
                    {!isLogin && <button type='button' role="submit" className="btn btn-outline-primary" style={{color: 'black'}} onClick={handleLoginRegister}>Back to Login</button>}
                    {!isLogin && <button type='submit' className="btn btn-outline-primary" style={{color: 'black'}} >Confirm Registration</button>}
                </div>
            </form>
            <button className="btn btn-outline-light mt-1" onClick={handleGoogle}>
                <img src={Google} id='Google-logo' alt=''/>
                <p className="black">Sign in with google</p>
            </button>
        </div>
    );
}

export default Login;