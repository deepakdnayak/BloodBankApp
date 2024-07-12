import React, { useContext, useState } from 'react';
import RightImage from '../images/login.jpg';
import UserLogo from '../images/user.jpg';
import BBContext from '../context/bloodbank/BBContext';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const context = useContext(BBContext);
    const { setAT } = context;

    const [credentials, setCredentials] = useState({BBUserName: "", BBPassword: ""});
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload

        const responce = await fetch("http://localhost:5000/api/authBloodBank/login",{
            method: 'POST',

            headers : {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({BBUserName: credentials.BBUserName, BBPassword: credentials.BBPassword }),
        });
        const json = await responce.json();
        console.log(json);

        if(json.success){
            setAT(json.authToken);
            navigate("/")
        }
        else {
            console.log("Invalid Credentials");
        }
    }


    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col d-none d-lg-block">
                    <img className="img-fluid" src={RightImage} alt="Imageright" />
                </div>
                <div className="col">
                    <form className="container p-5" onSubmit={handleSubmit}>
                        <div className="text-center">
                            <img src={UserLogo} alt="UserLogo" />
                            <p className="fs-4">Blood Bank Login</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="BBUserName" className="form-label">User Name</label>
                            <input type="text" className="form-control" name="BBUserName" id="BBUserName" aria-describedby="emailHelp" value={credentials.BBUserName} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="BBPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="BBPassword" name="BBPassword" value={credentials.BBPassword} onChange={onChange} />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">LOGIN</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;