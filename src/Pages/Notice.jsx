import { Icon } from '@iconify/react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import ViewAllNotice from '../Modals/ViewAllNotice';
import ViewParticularNotice from '../Modals/ViewParticularNotice';

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

    .greyText{
        color: var(--greyTextColor);
    }

    .table td {
        border-right: 0.3px solid #dee2e6;
    }

    .viewBtn{
        border: 1px solid var(--viewBtn);
        color: #000;
        background-color: var(--viewBtn);
        border-radius: var(--borderRadius5px);
    }

    .viewBtn:active, .viewBtn:hover{
        border: 1px solid var(--viewBtn);
        color: #000;
        background-color: var(--viewBtn);
        border-radius: var(--borderRadius5px);
    }
    
`;

const Notice = () => {

    const [showData, setShowData] = useState(true);
    const [dataId, setDataId] = useState('');

    const dataViewHandleState = () => {
        setShowData(false)
    }

    const setDataIdValueFunct = (e) => {
        setDataId(e)
    }
    
    return (

        <Container className="container-fluid p-4 overflow-scroll">
            <div className="row pb-3">
                <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                    <ol className="breadcrumb mb-1">
                        <li className="breadcrumb-item">
                            <Link to="/" className='align-self-center bredcrumText text-decoration-none font14'>Home</Link>
                            <Icon className='ms-2' icon="ep:arrow-right-bold" width="1em" height="1em" style={{ color: '#78788C' }} />
                        </li>
                        <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">Notice</li>
                    </ol>
                </nav>
                <p className='font14 ps-0 fw-bolder'>Notice Details</p>
            </div>
            <div className="row p-3 bg-white borderRadius5 pb-5">
               {showData ? <ViewAllNotice viewState={ dataViewHandleState } dataById={setDataIdValueFunct}/> : <ViewParticularNotice dataId={dataId}/>}
            </div>
        </Container>

    )
}

export default Notice
