import React from 'react'
import Donate from '../images/donate.jpg'
function LoginType() {
    return (
        <>
            <img src="./" alt="" />
            <span className="border-top border-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 vh-100 bg-secondary-emphasis border border-5">
                            <div className='userlogin'>
                                <span className="border border-start-0 border-white border-5">
                                    <img src={Donate} style={{ marginTop: "10%", height: "90vh" }} ></img>
                                </span>
                            </div>
                        </div>
                        <div className="col-lg-6 vh-100 bg-body-emphasis">
                            < div className="col" style={{ marginTop: "30%", marginLeft: "10%" }}>
                                <div style={{ marginLeft: "10%", textAlign: "center" }}>
                                    <img src="./images/user.jpg" style={{ marginBottom: "5%", height: "5vh" }} ></img>
                                    <h4><b>Blood Bank </b> Login</h4>
                                </div>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label" for="loginName">username</label>
                                    <input type="email" id="loginName" className="form-control" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label for="inputPassword4" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="inputPassword4" placeholder="Password*" />
                                    <div className="d-grid gap-2" style={{ marginTop: "10%" }}>
                                        <button className="btn btn-success" type="button">LOGIN</button>


                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#">Forgot password?</a></li>
                                            <div className="alignment" style={{ marginLeft: "56.5%" }} >
                                                <li className="breadcrumb-item">
                                                    <a href="#">Register Hospital</a>
                                                </li>
                                            </div>
                                            <li className="breadcrumb-item" style={{ marginLeft: "76%" }}>
                                                <a href="#">Register Blood Bank</a>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </span>

        </ >

    )
}

export default LoginType