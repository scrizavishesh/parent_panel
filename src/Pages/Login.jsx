import React, { useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import { Icon } from '@iconify/react';

const Container = styled.div`

    height: 100vh;

    .form-check-input:checked{
        background-color: var(--greenTextColor);
        border-color: var(--greenTextColor);
    }

    .form-check-input{
        box-shadow: none !important;
    }

    .loginmain{
        height: 100vh;
    }

    .btnsubmitOwn{
        background-color: #008479 !important;
    }

    .loginrow{
        height: 100%;
        align-items: center;
        justify-content: center;
        background:linear-gradient(#F0F8F7, white);
    }

    .formcontrolinputEmail{
        border: 1px solid #E4E7EB;
        border-radius: 6px;
        box-shadow: none !important;
        font-size: 16px;
    }

    .formcontrolinputpass{
        border-top: 1px solid #E4E7EB !important;
        border-left: 1px solid #E4E7EB !important;
        border-bottom: 1px solid #E4E7EB !important;
        border-right: none !important;
        border-radius: 6px 0px 0px 6px;
        box-shadow: none !important;
        font-size: 16px;
    }

    .border_danger{
        border-top: 1px solid rgba(220, 53, 69,1) !important;
        border-left: 1px solid rgba(220, 53, 69,1) !important;
        border-bottom: 1px solid rgba(220, 53, 69,1) !important;
        border-right: none !important;
        border-radius: 6px 0px 0px 6px;
        box-shadow: none !important;
        font-size: 16px;
    }

    .formcontrolinputpasseye{
        border-top: 1px solid #E4E7EB !important;
        border-right: 1px solid #E4E7EB !important;
        border-bottom: 1px solid #E4E7EB !important;
        border-left: none !important;
        border-radius: 0px 6px 6px 0px;
        box-shadow: none !important;
        cursor: pointer;
    }

    .border_danger_eye{
        border-top: 1px solid rgba(220, 53, 69,1) !important;
        border-right: 1px solid rgba(220, 53, 69,1) !important;
        border-bottom: 1px solid rgba(220, 53, 69,1) !important;
        border-left: none !important;
        border-radius: 0px 6px 6px 0px;
        box-shadow: none !important;
        cursor: pointer;
    }

    .formcontrolinputEmail::placeholder, .formcontrolinputpass::placeholder{
        color: #ADADBD;
        font-size: 14px;
    }
`;

const Login = () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");

    const [isRemeberChecked, setIsRemeberChecked] = useState(false);

    const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
    const PasswordRegex = /^(?=.*[a-z])(?=.*[@./_])(?=.*[0-9])(?=^\S*$).{4,}$/;
    // const PasswordRegex = /^(?=.*[A-Z])(?=.*[@./_])(?=.*[0-9])(?=^\S*$).{4,}$/;


    // ************    show and hide functionality of password    ************


    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    // ************    show and hide functionality of password    ************



    const validateEmail = (value) => {
        if (!value.trim()) {
            return 'Email is required';
        } else if (!emailRegex.test(value)) {
            return 'Invalid email format';
        }
        return '';
    };

    const validatePassword = (value) => {
        if (!value.trim()) {
            return 'Password is required';
        } else if (!PasswordRegex.test(value)) {
            return 'Invalid password format';
        }
        return '';
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailError(validateEmail(newEmail));
    };

    const handlePassword = (e) => {
        const newInputValue = e.target.value;
        setPass(newInputValue);
        setPassError(validatePassword(newInputValue));
    };

    const validateFields = () => {
        let isValid = true;

        if (!email) {
            setEmailError('* This field is required');
        } else {
            setEmailError('');
        }

        if (!pass) {
            setPassError('* This field is required');
        } else {
            setPassError('');
        }

        return isValid;
    };

    const SubmitLogin = async () => {
        if (validateFields()) {
            try {
                const data = {
                    'email': email,
                    'password': pass
                }
                var response = await loginApi(data);
                console.log(response, 'loginnn')
                if (response?.status === 200) {
                    if (response.data.status === 'success') {
                        localStorage.setItem('token', response?.data?.token)
                        console.log('login success');
                        console.log('login token', response?.data?.token);
                        window.location.reload();
                    }
                    else {
                        toast.error(response?.data?.msg)
                        console.log('login fail')
                    }
                }
                else {
                    console.log(response, 'else2')
                    toast.error(response?.error);
                }
            }
            catch (error) {
                console.error('Error during login:', error);
            }
        }
    }


    return (

        <Container>
            <div className="conatiner-fluid loginmain">
                <div className="row loginrow">
                    <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center">
                        <img src="./images/loginimg.svg" alt="" className='img-fluid m-4' />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="row me-xl-5 ms-xl-5 ps-xl-5 pe-xl-5">
                            <p className='text-center'><img src="./images/Scrizalogo.svg" alt="" className='img-fluid' /></p>
                            <form className='pt-xl-3 pe-xl-5 ps-xl-5 pt-lg-2 pe-lg-2 ps-lg-2'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" className={`form-control formcontrolinputEmail ${emailError ? 'border-1 border-danger' : ''} `} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='&#xF0E0; Your Email Address' onChange={handleEmailChange} />
                                    <div>
                                        <span className='text-danger'>{emailError}</span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <div className="d-flex bg-white">
                                        <input type={showPassword ? 'text' : 'password'} className={`form-control formcontrolinputpass ${passError ? 'border_danger' : ''} `} id="exampleInputPassword1" placeholder='&#xf084; 6+ Strong Character' onChange={handlePassword} />
                                        <div className={`formcontrolinputpasseye p-1 ps-2 pe-2  ${passError ? 'border_danger_eye' : ''} `}><span className="align-self-center" onClick={toggleShowPassword}> {showPassword ? <Icon icon="clarity:eye-show-line" width="2em" height="2em" style={{ color: '#008479' }} /> : <Icon icon="clarity:eye-hide-line" width="2em" height="2em" style={{ color: '#d9d7d7' }} />} </span></div>
                                    </div>
                                    <div>
                                        <span className='text-danger'>{passError}</span>
                                    </div>
                                </div>
                                <div className="mb-4 mt-4 form-check d-flex">
                                    <div className="col-6">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label ps-2" htmlFor="exampleCheck1" onChange={() => setIsRemeberChecked(!isRemeberChecked)}>Remember Me</label>
                                    </div>
                                    <div className="col-6 text-end">
                                        <Link className='text-primary text-decoration-none' to='/forgotPassword'>Forget Password?</Link>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 col-12 mx-auto">
                                    <Link type="submit" className="btn btnsubmitOwn text-white" onClick={SubmitLogin}>Submit</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Toaster />
            </div>


        </Container>
    )
}

export default Login