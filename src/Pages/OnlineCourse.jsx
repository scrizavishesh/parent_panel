import { Icon } from '@iconify/react';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import DataLoader from '../Layouts/Loader';

const Container = styled.div`
    height: 92vh;

    .subjectName{
        background-color: #E1EDEB;
        padding: 0.7rem;
    }

    .cards{
        border : 1px solid var(--cardsBorder);
        background-color: #fff;
        border-radius: var(--borderRadius10px);
    }

    .mainBreadCrum{
        --bs-breadcrumb-divider: none !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .greyText{
        color: var(--greyTextColor);
    }

    .table td {
        border-right: 0.3px solid #dee2e6;
    }

    .card{
        padding: 0%;
        border: 1px solid ;
    }

    .card-header {
        background-color: white !important;
        border-bottom: none !important;
    }

    .subjectButton{
        background-color: var(--borderSidebar);
    }

    .continueLesson{
        background-color: var(--greenTextColor);
        border-radius: var(--borderRadius17px);
    }

`;

const OnlineCourse = () => {

    return (

        <Container className="container-fluid p-3 overflow-scroll">
        {/* {
          loaderState && (
            <DataLoader />
          )
        } */}
            <div className="row pb-2 ps-3 pt-2">
                <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                    <ol className="breadcrumb mb-1">
                        <li className="breadcrumb-item">
                            <Link to="/" className='align-self-center bredcrumText text-decoration-none font14'>Home</Link>
                            <Icon className='ms-2' icon="ep:arrow-right-bold" width="1em" height="1em" style={{ color: '#78788C' }} />
                        </li>
                        <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">Online Course</li>
                    </ol>
                </nav>
                <p className='font14 ps-0 fw-bolder'>Online Course Details</p>
            </div>
            <div className="row">
                <div className="col-sm-6 col-12">
                    <div className="row p-2">
                        <div className="col-12 cards h-100 overflow-hidden">
                            <div className="row">
                                <div className="d-flex p-0">
                                    <div className="flex-grow-1 p-2 ps-3 align-self-center">
                                        <p className='font14 align-self-center'>Intro to Biology</p>
                                    </div>
                                    <div className="align-self-center">
                                        <span className='font14 subjectName'>Biology</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-3">
                                <img className='img-fluid' src="./images/pana2.svg" alt="" />
                            </div>
                            <div className="row p-4">
                                <p className='text-center'>
                                    <button className='btn continueLesson ps-3 pe-3 text-white font12' type='button'>Continue Lesson</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-12">
                    <div className="row p-2">
                        <div className="col-12 cards h-100 overflow-hidden">
                            <div className="row">
                                <div className="d-flex p-0">
                                    <div className="flex-grow-1 p-2 ps-3 align-self-center">
                                        <p className='font14 align-self-center'>Intro to Biology</p>
                                    </div>
                                    <div className="align-self-center">
                                        <span className='font14 subjectName'>Chemistry</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-3">
                                <img className='img-fluid' src="./images/rafiki.svg" alt="" />
                            </div>
                            <div className="row p-4">
                                <p className='text-center'>
                                    <button className='btn continueLesson ps-3 pe-3 text-white font12' type='button'>Continue Lesson</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-12">
                    <div className="row p-2">
                        <div className="col-12 cards h-100 overflow-hidden">
                            <div className="row">
                                <div className="d-flex p-0">
                                    <div className="flex-grow-1 p-2 ps-3 align-self-center">
                                        <p className='font14 align-self-center'>Intro to Biology</p>
                                    </div>
                                    <div className="align-self-center">
                                        <span className='font14 subjectName'>Chemistry</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-3">
                                <img className='img-fluid' src="./images/pana.svg" alt="" />
                            </div>
                            <div className="row p-4">
                                <p className='text-center'>
                                    <button className='btn continueLesson ps-3 pe-3 text-white font12' type='button'>Continue Lesson</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-12">
                    <div className="row p-2">
                        <div className="col-12 cards h-100 overflow-hidden">
                            <div className="row">
                                <div className="d-flex p-0">
                                    <div className="flex-grow-1 p-2 ps-3 align-self-center">
                                        <p className='font14 align-self-center'>Intro to Biology</p>
                                    </div>
                                    <div className="align-self-center">
                                        <span className='font14 subjectName'>Mathematics</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-3">
                                <img className='img-fluid' src="./images/amico.svg" alt="" />
                            </div>
                            <div className="row p-4">
                                <p className='text-center'>
                                    <button className='btn continueLesson ps-3 pe-3 text-white font12' type='button'>Continue Lesson</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-12">
                    <div className="row p-2">
                        <div className="col-12 cards h-100 overflow-hidden">
                            <div className="row">
                                <div className="d-flex p-0">
                                    <div className="flex-grow-1 p-2 ps-3 align-self-center">
                                        <p className='font14 align-self-center'>Intro to Biology</p>
                                    </div>
                                    <div className="align-self-center">
                                        <span className='font14 subjectName'>Mathematics</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-3">
                                <img className='img-fluid' src="./images/amico2.svg" alt="" />
                            </div>
                            <div className="row p-4">
                                <p className='text-center'>
                                    <button className='btn continueLesson ps-3 pe-3 text-white font12' type='button'>Continue Lesson</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-12">
                    <div className="row p-2">
                        <div className="col-12 cards h-100 overflow-hidden">
                            <div className="row">
                                <div className="d-flex p-0">
                                    <div className="flex-grow-1 p-2 ps-3 align-self-center">
                                        <p className='font14 align-self-center'>Intro to Biology</p>
                                    </div>
                                    <div className="align-self-center">
                                        <span className='font14 subjectName'>Mathematics</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-3">
                                <img className='img-fluid' src="./images/rafiki2.svg" alt="" />
                            </div>
                            <div className="row p-4">
                                <p className='text-center'>
                                    <button className='btn continueLesson ps-3 pe-3 text-white font12' type='button'>Continue Lesson</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>

    )
}

export default OnlineCourse