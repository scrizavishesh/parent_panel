import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DataLoader from '../Layouts/Loader';
import { getNoticeDataByIdApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import { Icon } from '@iconify/react';

const Container = styled.div`

    .backBtn{
        border: 1px solid var(--viewBtn) !important;
        color: var(--breadCrumTextColor) !important;
    }

`;


const ViewParticularNotice = ({ dataId }) => {


    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [noticeTitleById, setNoticeTitleById] = useState('');
    const [noticeDateById, setNoticeDateById] = useState('');
    const [noticeTimeById, setNoticeTimeById] = useState('');
    const [noticeDescriptionById, setNoticeDescriptionById] = useState('');

    useEffect(() => {
        getNoticeDataById();
    }, [token])


    const getNoticeDataById = async () => {
        try {
            setloaderState(true);
            var response = await getNoticeDataByIdApi(dataId);
            console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setNoticeTitleById(response?.data?.notice?.noticeTitle)
                    setNoticeDateById(response?.data?.notice?.noticeDate)
                    setNoticeTimeById(response?.data?.notice?.noticeTime)
                    setNoticeDescriptionById(response?.data?.notice?.description)
                    toast.success(response?.data?.message);
                    setloaderState(false);
                }
                else {
                    console.log('error')
                    toast.error(response?.data?.message);
                }
            }
            else {
                console.log('error')
                toast.error(response?.data?.message);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Container className="container-fluid">
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="row">
                <div className="d-flex">
                    <div className="flex-grow-1">
                        <p className='font20'>{noticeTitleById}</p>
                        <p className='font12 greyText'>{noticeDateById} {noticeTimeById}</p>
                    </div>
                    <button className='btn backBtn p-2' type='button'>
                        <div className="d-flex">
                            <Icon className='align-self-center' icon="weui:back-filled" width="1.3em" height="1.3em" style={{ color: '#134563' }} />
                            <span className='font14 align-self-center'>Back</span>
                        </div>
                    </button>
                </div>
            </div>
            <hr />
            <div className="row">
                <p className='font14'>{noticeDescriptionById}</p>
            </div>
            <Toaster />
        </Container>
    )
}

export default ViewParticularNotice