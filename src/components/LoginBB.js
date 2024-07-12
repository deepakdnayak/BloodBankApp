import React, { useContext } from 'react';
import RightImage from '../images/login.jpg';
import UserLogo from '../images/user.jpg';


const Login = () => {

    const context = useContext();
    const { setAT } = context;

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col d-none d-lg-block">
                    <img className="img-fluid" src={RightImage} alt="Imageright" />
                </div>
                <div className="col">
                    <form className="container p-5">
                        <div className="text-center">
                            <img src={UserLogo} alt="UserLogo" />
                            <p className="fs-4">Blood Bank Login</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">User Name</label>
                            <input type="email" className="form-control" name="username" id="username" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">LOGIN</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

/*

<div className="row">
            <div className="col-md-6 d-none d-lg-block d-flex justify-content-center align-items-center">
                <img className="img-fluid" src={RightImage} alt="Image" />
            </div>
            <div className="col-md-6 d-flex justify-content-center">
                <form className="container p-5">
                    <div className="text-center">
                        <img src={UserLogo} alt="UserLogo" />
                        <p className="fs-4">Blood Bank Login</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">LOGIN</button>
                </form>
            </div>
        </div>

*/