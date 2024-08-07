import React, { useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { getOTPByMailApi } from '../Utils/Apis';


const Container= styled.div`
    height: 100vh;
    .btnsubmitOwn{
        background-color: #008479 !important;
    }

    .imagearea{
        background: linear-gradient(135deg, #D8E6FF, white);
    }

    .formarea{
        background:linear-gradient(#F0F8F7, white);
    }

    .formcontrolinput{
        border: 1px solid #E4E7EB;
        border-radius: 6px;
        font-size: 16px;
    }

    .formcontrolinput::placeholder{
        color: #ADADBD;
        font-size: 14px;
    }

    .text-grey{
        color: #8F8F8F;
    }


`;

const Span14Font = styled.span`
    font-size: 14px;
    font-family: Noto Sans;
`;



const ForgotPassword = () => {

    const navigate = useNavigate();

    const [mail, setMail] = useState('');
    const [mailError, setMailError] = useState('');

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setMail(email);
        setMailError(validateMail(email));
    };

    // *********************************************************************************
    //                        Validation of all inputs
    // *********************************************************************************

    const emailRegex =  /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;

    const validateMail = (value) => {
        if (!value.trim()) {
            return 'Email is required';
        } else if (!emailRegex.test(value)) {
            return 'Invalid characters !!';
        }
        return '';
        };

    const validateFields = () => {
        let isValid = true;

        if (!mail) {
            setMailError('* Email is required');
            isValid = false;
        } else {
            setMailError('');
        }

        return isValid;
    };

    // *********************************************************************************
    //                        Validation of all inputs
    // *********************************************************************************
    
    
    const getOtp = async() => {
        if(validateFields()){
            try{
                console.log('mail', mail)
                var response = await getOTPByMailApi(mail);
                if(response?.status===200){
                    console.log('first 20000')
                  if(response?.data?.status==='success'){
                    console.log(response?.data?.token, 'Forget Token')
                    localStorage.setItem('forgteToken', response?.data?.token)
                    navigate('/verifyOtp');
                  }
                }
            }
            catch{
        
            }
        }
    }
    
    return (
        <>
            <Container>
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <div className="col-md-6 col-sm-12 p-5 imagearea">
                            <img src="./images/pana.svg" alt="" className='img-fluid m-5'/>
                        </div>
                        <div className="col-md-6 col-sm-12 p-5 formarea">
                            <div className="row text-center pt-5 mt-5">
                                <p><img src="./images/Scrizalogo.svg" alt="" className='img-fluid' /></p>
                            </div>
                            <div className="row p-5 ms-3 me-3">
                                <Span14Font>
                                    <p className='font18 mb-1'>Forgot Your Password?</p>
                                    <h2 className='text-grey font16 mb-3'>Enter your email to reset it?</h2>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label font16">Email</label>
                                            <input type="email" className={`form-control formcontrolinput${mailError ? 'border-1 border-danger' : ''} `} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='&#xF0E0; Your Email Address' onChange={handleEmailChange}/>
                                            <span className="text-danger">{mailError}</span>
                                        </div>
                                        <div className="d-grid gap-2 col-12 mx-auto">
                                            <Link type="submit" className="btn btnsubmitOwn text-white" onClick={getOtp}>Confirm</Link>
                                        </div>
                                        <div className="d-grid gap-2 col-12 mx-auto">
                                            <Link type="submit" className="m-2 text-center text-black text-decoration-none" to='/'>
                                                <svg className='me-2' xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16">
                                                    <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                                </svg>
                                                Return to the Login Page
                                            </Link>
                                        </div>
                                    </form>
                                </Span14Font>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
      )
}

export default ForgotPassword