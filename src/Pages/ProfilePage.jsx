import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import DataLoader from '../Layouts/Loader';
import { getStudentProfileDataApi, updateStudentProfileDataApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div`
    height: 92vh;
    .mainBreadCrum{
        --bs-breadcrumb-divider: none !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .ExportBtns{
        border-radius: 3px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-check-input{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .greenBgModal{
        background-color: var(--breadCrumActiveTextColor);
    }

    .greenText{
        color: var(--greenTextColor);
    }

    .orangeText{
        color: var(--OrangeBtnColor);
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }

    .infoIcon{
        cursor: pointer;
    }

    .headingBgColor{
        background-color: var(--headingBackgroundColor);
        
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .CancelBtnn, .CancelBtnn:active{
        border: 2px solid var(--BtnBorder);
    }

    .verifiedBtn{
        background-color: var(--verifiedButton);
    }

    .form-control{
        border : 1px solid var(--fontControlBorder);
    }

    .formcontrolButtonborder {
        border-top: 1px solid var(--greenTextColor) !important;
        border-right: 1px solid var(--greenTextColor) !important;
        border-bottom: 1px solid var(--greenTextColor) !important;
        border-left: none !important;
        background-color: var(--greenTextColor);
        border-radius: 0px 6px 6px 0px;
        box-shadow: none !important;
        cursor: pointer;
    }

    .greyText{
        color: var(--greyTextColor);
    }

    .borderRadiusleft{
        border-radius: 5px 0px 0px 5px;
    }
    
`;

const ProfilePage = () => {

    const token = localStorage.getItem('token');
    const [changeImageType, setChangeImageType] = useState(true)

    // Data State 
    const [StudentName, setStudentName] = useState('');
    const [StudentClass, setStudentClass] = useState('');
    const [StudentSection, setStudentSection] = useState('');
    const [StudentPhone, setStudentPhone] = useState('');
    const [StudentAddress, setStudentAddress] = useState('');
    const [StudentEmail, setStudentEmail] = useState('');
    const [StudentDOB, setStudentDOB] = useState('');
    const [StudentGender, setStudentGender] = useState('');
    const [StudentPhoto, setStudentPhoto] = useState('');
    // const [StudentPhoto, setStudentPhoto] = useState('');

    //loader State
    const [loaderState, setloaderState] = useState(false);

    useEffect(() => {
        getProfileData();
    }, [token])

    const getProfileData = async () => {
        try {
            setloaderState(true);
            var response = await getStudentProfileDataApi();
            console.log(response, 'profile')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setStudentName(response?.data?.student?.studentName)
                    setStudentClass(response?.data?.student?.classNo)
                    setStudentSection(response?.data?.student?.classSection)
                    setStudentPhone(response?.data?.student?.studentPhone)
                    setStudentAddress(response?.data?.student?.address)
                    setStudentEmail(response?.data?.student?.studentEmail)
                    setStudentDOB(response?.data?.student?.dateOfBirth)
                    setStudentGender(response?.data?.student?.studentGender)
                    setStudentPhoto(response?.data?.student?.studentImage)
                    toast.success(response.data.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            console.log('Error Facing during Get All Event API - ', error)
        }
    }

    const updateProfileData = async () => {
        try {
            setloaderState(true);
            const formData = new FormData();
            formData.append('studentAddress', StudentAddress)
            formData.append('phoneNumber', StudentPhone)
            var response = await updateStudentProfileDataApi(formData);
            console.log(response, 'profile updated')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    toast.success(response.data.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            console.log('Error Facing during Get All Event API - ', error)
        }
    }

    return (

        <Container className="container-fluid p-4 overflow-scroll">
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="row pb-3">
                <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                    <ol className="breadcrumb mb-1">
                        <li className="breadcrumb-item">
                            <Link to="/" className='align-self-center bredcrumText text-decoration-none font14'>Home</Link>
                            <Icon className='ms-2' icon="ep:arrow-right-bold" width="1em" height="1em" style={{ color: '#78788C' }} />
                        </li>
                        <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">Profile</li>
                    </ol>
                </nav>
                <p className='font14 ps-0 fw-bolder'>My Account</p>
            </div>
            <div className="row p-3 bg-white borderRadius5 pb-5">
                <div className="col-md-4 col-sm-12">
                    <div className="row h-100">
                        <div className="headingBgColor borderRadius5 ps-4 pe-4">
                            <p className='p-3 text-center'><img className='rounded-circle' src={StudentPhoto} alt="Student Profile Image" height={80}/></p>
                            <p className="text-center mb-2"><span className='font14 text-center mb-2 activeTexttt fontWeight600'>{StudentName}</span></p>
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <span className='font14 '>Admin</span>
                                <button className='ms-2 verifiedBtn btn text-white font12 align-items-center p-1 ps-3 pe-3 cardradius2'>Verified</button>
                            </div>
                            <hr className='mb-2 mt-2' />
                            <span className='font14 p-0 greenText fw-bold'>Details info</span>
                            <hr className='mb-2 mt-2' />
                            <form action="" className='pe-0'>
                                <div className="row p-0">
                                    <label htmlFor="staticEmail" className="col-sm-3 col-form-label greyText font14">Class :</label>
                                    <div className="col-sm-9 flex-wrap">
                                        <div className="row">
                                            <input type="text" readOnly className="form-control-plaintext text-end font14" id="staticEmail" value={StudentClass} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row p-0">
                                    <label htmlFor="staticEmail" className="col-sm-3 col-form-label greyText font14">Section :</label>
                                    <div className="col-sm-9 flex-wrap"><div className="row"> <input type="text" readOnly className="form-control-plaintext text-end font14" id="staticEmail" value={StudentSection} /> </div> </div>
                                </div>
                                <div className="row p-0">
                                    <label htmlFor="staticPhone" className="col-sm-3 col-form-label greyText font14">Phone :</label>
                                    <div className="col-sm-9 flex-wrap"><div className="row"> <input type="text" readOnly className="form-control-plaintext text-end font14" id="staticPhone" value={StudentPhone} /> </div> </div>
                                </div>
                                <div className="row p-0">
                                    <label htmlFor="staticAddress" className="col-sm-3 col-form-label greyText font14">Address :</label>
                                    <div className="col-sm-9"><div className="row"><input type="text" readOnly className="form-control-plaintext text-end text-break font14" id="staticAddress" value={StudentAddress} /> </div> </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-sm-12">
                    <form className="row mb-1 g-3">
                        <div className="col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Name</label>
                            <input type="text" className={`form-control font14`} id="validationDefault02" value={StudentName} disabled/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Email</label>
                            <input type="text" className={`form-control font14`} id="validationDefault02" value={StudentEmail} disabled/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Class & Section</label>
                            <input type="text" className={`form-control font14`} id="validationDefault02" value={StudentSection} disabled />
                        </div>
                        <div className="col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Birthday</label>
                            <input type="date" className={`form-control font14`} id="validationDefault02" value={StudentDOB} disabled/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Gender</label>
                            <select className={`form-select font14`} aria-label="Default select example" value={StudentGender} disabled>
                                <option selected disabled >--- Choose ---</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Phone Number</label>
                            <input type="text" className={`form-control font14`} id="validationDefault02" value={StudentPhone} onChange={(e) => setStudentPhone(e.target.value)}/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Address</label>
                            <textarea type="text" className={`form-control font14`} id="validationDefault02" value={StudentAddress} onChange={(e) => setStudentAddress(e.target.value)}></textarea>
                        </div>
                        <div className="col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Photo</label>
                            <div className="d-flex bg-white">
                                {StudentPhoto && changeImageType ? (
                                    <p className='col-11 border borderRadiusleft'><img className='' src={StudentPhoto} height={40} alt='student image' /></p>
                                ) : (
                                    <input type='file' className={`form-control font14 p-2`} id="validationDefault02" />
                                )}
                                <div className='formcontrolButtonborder p-2 ps-4 pe-4 text-center'>
                                    <span className="text-white font14 align-self-center">
                                        {changeImageType ? 'Edit' : 'View'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <p>
                                <button className='btn addButtons text-white font14' type='button' onClick={updateProfileData}>Save Changes</button>
                                <button className='btn cancelButtons font14 ms-3' type='button'>Cancel</button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster />
        </Container>

    )
}

export default ProfilePage