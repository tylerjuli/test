import React from 'react'
import { 
    Link,
 } from "react-router-dom";

export default function Header({authActions, isLogin}){
    const logout = () => {
        authActions.userLogout()
    }
    return(
        <header className="myHeader">
            <div className="container">
                <div className="row headerRow">
                    <div className="col-6">
                        <Link to="/signin" className="brandName">
                            <img src={require('../../static/images/logo_top.png')} alt="signin" />
                        </Link>
                    </div>
                    <div className="col-6">
                        <ul className="navLinks">
                            {
                                !isLogin&&
                                <React.Fragment>
                                    <li>
                                        <Link to="/signin">
                                            <span className="logoutIc">
                                                <img src={require('../../static/images/ic_sign_in.svg')} alt="signin" />
                                            </span> 
                                            Sign In
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/signup">
                                            <span className="logoutIc"> 
                                                <img src={require('../../static/images/ic_sign_up.svg')} alt="signup" />
                                            </span> 
                                            Sign up
                                        </Link>
                                    </li>
                                </React.Fragment>
                            }
                            {
                                isLogin&&
                                <li>
                                    <a href="/" onClick={ () => { logout() }} >
                                        <span className="logoutIc">
                                            <img src={require('../../static/images/logout.svg')} alt="logout" />
                                        </span> 
                                        Logout
                                    </a>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </header>                
    )
} 