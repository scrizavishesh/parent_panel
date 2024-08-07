import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { getAllHolidayDataApi, getAllNoticeDataApi } from '../Utils/Apis';
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';

const Container = styled.div`

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

const ViewAllNotice = ({ viewState,dataById }) => {

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const searchByKey = '';

    const [NoticeData, setNoticeData] = useState([]);

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        getAllNotices();
    }, [token]);

    const getAllNotices = async () => {
        try {
            setloaderState(true);
            var response = await getAllNoticeDataApi(searchByKey, pageNo, pageSize);
            console.log(response, 'holiday')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setNoticeData(response?.data?.notices)
                    setCurrentPage(response?.data?.currentPage)
                    setTotalPages(response?.data?.totalPages)
                    toast.success(response.data.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                console.log(response?.data?.msg);
            }
        }
        catch (error) {
            console.log('Error Facing during Get All Notice API - ', error)
        }
    }

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };



    const handlePage = (id) => {
        viewState(true)
        dataById(id)
    }

    return (
        <Container className="container-fluid">
        {
            loaderState && (
                <DataLoader />
            )
        }
            <div className="row">
                <table className="table align-middle table-striped">
                    <thead>
                        <tr>
                            <td className='font14'>#</td>
                            <td className='font14'>Notice Details</td>
                            <td className='font14'>Date</td>
                            <td className='font14 text-center'>Actions</td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr></tr>
                        {NoticeData.map((item, index) => (
                            <tr key={item.noticeId}>
                                <td className='font14 greyText'>{index + 1}</td>
                                <td className='font14 greyText'>{item.noticeTitle}</td>
                                <td className='font14 greyText'>{item.noticeDate}</td>
                                <td className='font14 text-center'>
                                    <button className='btn viewBtn font12' onClick={()=> handlePage(item.noticeId)}> View </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="d-flex">
                    <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
                    <div className="ms-auto">
                        <ReactPaginate
                            previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                            nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                            breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10}
                            onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'}
                        />
                    </div>
                </div>
                <Toaster />
            </div>
        </Container>
    )
}

export default ViewAllNotice
