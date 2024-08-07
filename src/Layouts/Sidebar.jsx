import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { useSidebarContext } from '../Dashboard/DashboardLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logoutApi } from '../Utils/Apis';
import { Link, useLocation } from 'react-router-dom';

const Container = styled.div`
    background-color: var(--sidebarBackground);
    width: ${({ sidebaropen }) => (sidebaropen ? '224px' : '64px')};
    transition: all 0.3s ease;
    position: sticky;
    bottom:0;

    ul {
        max-height: calc(100vh - 10vh);
        overflow: auto;
    }

    .dashed{
        list-style: none !important;
    }

    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .modalLightBorder{
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .deleteSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

    .borderTOP {
        border-top: 1px solid var(--borderSidebar);
    }

    .borderBottom {
        border-bottom: 1px solid var(--borderSidebar);
    }

    .menus {
        position: relative;
        padding: 1rem;
        display: flex;
        color: #000;
        align-items: center;
        white-space: nowrap;
        text-decoration : none !important;
        transition: background-color 0.3s, color 0.3s,;

        &:hover {
            background-color: #008479;
            color: #ffffff;
            border-right: 5px solid orange;
        }

        &:hover::before {
            content: "";
            position: absolute;
            right: -2.5px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-right: 10px solid orange;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
        }

        &.active {
            background-color: var(--greenTextColor);
            color: #ffffff;
            border-right: 5px solid orange;
        }

        &.active::before {
            content: "";
            position: absolute;
            right: -2.5px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-right: 10px solid orange;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
        }

        .menu-text {
            display: ${({ sidebaropen }) => (sidebaropen ? 'inline' : 'none')};
            margin-left: 10px;
            transition: margin-left 0.3s ease;
        }

        ${({ sidebaropen }) => !sidebaropen && `
            &:hover .menu-text {
                display: inline;
                position: absolute;
                left: 55px;
                white-space: nowrap;
                background-color: var(--greenTextColor);
                padding: 0.68rem 1.5rem 0.68rem 1.5rem;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                border-right: 5px solid orange;
            }

            &:hover .menu-text::before {
                content: "";
                position: absolute;
                right: -2.5px;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-right: 10px solid orange;
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
            }
        `}
    }

    .collapse-menu {
        padding-left: 1.5rem;
    }
`;

const StickyHeader = styled.div`
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: var(--sidebarBackground);
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1000px) {
        justify-content: space-between;

        .sidebarclass{
            position: relative;
        }

        .toggle-icon {
            position: absolute;
            right: -15px !important;
            margin-top: 7% !important;
            display: block !important;
        }
    }

    .toggle-icon {
        display: none;
        cursor: pointer;
        color: #fff;
    }
`;

const Sidebar = () => {

    const token = localStorage.getItem('token');
    const { sidebaropen, toggleSidebar } = useSidebarContext();

    const location = useLocation();

    const [activeLink, setActiveLink] = useState(() => {
        const currentPath = location.pathname === '/' ? 'dashboard' : location.pathname.slice(1);
        localStorage.setItem('activeLink', currentPath);
        return currentPath;
    });

    useEffect(() => {
        const currentPath = location.pathname === '/' ? 'dashboard' : location.pathname.slice(1);
        setActiveLink(currentPath);
        localStorage.setItem('activeLink', currentPath);
    }, [location.pathname]);

    const handleActiveLink = (link) => {
        setActiveLink(link);
        localStorage.setItem('activeLink', link);
    };

    useEffect(()=>{
    },[token])

    const handleLogout = async() =>{
        try{
            var response = await logoutApi();
            console.log(response)
            if(response?.status===200){
                if(response?.data?.status==='success'){
                    localStorage.removeItem('token')
                    navigate('/')
                    window.location.reload(); 
                }
            }
            else{
                console.log(response?.data?.msg);
            }
        }
        catch{

        }
    }

    return (
        <Container sidebaropen={sidebaropen}>
            <div className="container-fluid">
                <StickyHeader className="row borderBottom">
                    <div className={`${sidebaropen ? "p-2" : "pt-3 pb-4"} text-white d-flex justify-content-center align-self-center`}>
                        <img className={` sidebarclass {sidebaropen ? "p-0" : "pt-4 pb-4"}`} src={sidebaropen ? "./images/Scrizalogo.svg" : "./images/ScrizaSmallLogo.png"} alt="sidebarLogo" style={{ transition: 'opacity 0.3s ease' }} />
                        <Icon className='toggle-icon' icon="emojione:left-arrow" width="1.7em" height="1.7em" onClick={toggleSidebar} />
                    </div>
                </StickyHeader>

                <div className="row p-0">
                    <ul className='p-0'>
                        <li>
                            <Link to="/" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'dashboard' ? 'active' : ''}`} onClick={() => handleActiveLink('dashboard')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <p className="ms-2 menu-text font14">Dashboard</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Fees" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Fees' ? 'active' : ''}`} onClick={() => handleActiveLink('Fees')} >
                                <Icon icon="ph:graduation-cap" width="1.5em" height="1.5em" />
                                <p className="ms-2 menu-text font14">Fees</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/examCategory" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'offlineExam' || activeLink === 'marks' || activeLink === 'grades' ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseExamination" onClick={() => handleActiveLink('examCategory')} >
                                <Icon icon="icon-park-outline:id-card-v" width="1.5em" height="1.5em" />
                                <p className="ms-2 menu-text font14">Examination</p>
                            </Link>
                            <div id="collapseExamination" className="collapse collapse-menu ps-0">
                                <ul className='dashed ps-3'>
                                    <li>
                                        <Link to="/offlineExam" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'offlineExam' ? 'active' : ''}`} onClick={() => handleActiveLink('offlineExam')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <p className="ms-2 menu-text font14">Offline Exams</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/marks" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'marks' ? 'active' : ''}`} onClick={() => handleActiveLink('marks')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <p className="ms-2 menu-text font14">Marks</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/grades" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'grades' ? 'active' : ''}`} onClick={() => handleActiveLink('grades')} >
                                            <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />
                                            <p className="ms-2 menu-text font14">Grades</p>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/teacher" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'teacher' ? 'active' : ''}`} onClick={() => handleActiveLink('teacher')} >
                                <Icon icon="mdi:teacher" width="1.5em" height="1.5em"/>
                                <p className="ms-2 menu-text font14">Teacher</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Assignments" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Assignments' ? 'active' : ''}`} onClick={() => handleActiveLink('Assignments')} >
                                <Icon icon="el:list-alt" width="1.5em" height="1.5em" />
                                <p className="ms-2 menu-text font14">Assignments</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/OnlineCourse" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'OnlineCourse' ? 'active' : ''}`} onClick={() => handleActiveLink('OnlineCourse')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <p className="ms-2 menu-text font14">Online Course</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/SamplePaper" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Sample Paper' ? 'active' : ''}`} onClick={() => handleActiveLink('Sample Paper')} >
                                <Icon icon="fluent:document-bullet-list-24-regular" width="1.5em" height="1.5em" />
                                <p className="ms-2 menu-text font14">Sample Paper</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Holiday" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Holiday' ? 'active' : ''}`} onClick={() => handleActiveLink('Holiday')} >
                                <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />
                                <p className="ms-2 menu-text font14">Holiday</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Notice" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Notice' ? 'active' : ''}`} onClick={() => handleActiveLink('Notice')} >
                                <Icon icon="bx:bell" width="1.5em" height="1.5em" />
                                <p className="ms-2 menu-text font14">Notice</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Event" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Event' ? 'active' : ''}`} onClick={() => handleActiveLink('Event')} >
                                <Icon icon="ic:round-event" width="1.5em" height="1.5em" />
                                <p className="ms-2 menu-text font14">Event</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Profile" className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'Profile' ? 'active' : ''}`} onClick={() => handleActiveLink('Profile')} >
                                <Icon icon="majesticons:user-box-line" width="1.5em" height="1.5em" />
                                <p className="ms-2 menu-text font14">Profile</p>
                            </Link>
                        </li>
                        <li>
                            <Link className={`menus p-2 d-flex borderBottom ${sidebaropen === '' ? 'justify-content-center' : ''} ${activeLink === 'logout' ? 'active' : ''}`} onClick={() => handleActiveLink('logout')} data-bs-toggle="offcanvas" data-bs-target="#logoutCanvas" aria-controls="logoutCanvas" >
                                <Icon icon="material-symbols:logout" width="1.5em" height="1.5em" />
                                <p className="ms-2 menu-text font14">Logout</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Logout */}

            <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="logoutCanvas" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header ps-0 modalHighborder p-1">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <h2 className="offcanvas-title fontWeight900" id="staticBackdropLabel">Logout Message</h2>
                </div>
                <div className="offcanvas-body p-0">
                    <div>
                        <div>
                            <p className='border-bottom p-2'>Logout</p>
                            <div className="text-center p-5">
                                <p className='mb-2'><img src="./images/logout.svg" alt="" /></p>
                                <h1 className='mb-2'>Are you Sure?</h1>
                                <h3 className='greyText'>Are you Sure you want to logout?</h3>
                                <p className='text-center p-3'>
                                    <button className='btn deleteButtons text-white' onClick={handleLogout}>Logout</button>
                                    <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </Container>
    );
};

export default Sidebar;