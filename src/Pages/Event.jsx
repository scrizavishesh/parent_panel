import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { getAllEventDataApi } from '../Utils/Apis';
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';

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

    .ongoingEventBtn:active, .ongoingEventBtn:hover{
        border: 1px solid var(--ongoingEventBtn) !important;
        color: var(--ongoingEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
    }

    .ongoingEventBtn{
        border: 1px solid var(--ongoingEventBtn) !important;
        color: var(--ongoingEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
    }

    .upcomingEventBtn:active, .upcomingEventBtn:hover{
        border: 1px solid var(--upcomingEventBtn) !important;
        color: var(--upcomingEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
    }

    .upcomingEventBtn{
        border: 1px solid var(--upcomingEventBtn) !important;
        color: var(--upcomingEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
    }

    .closedEventBtn:active, .closedEventBtn:hover{
        border: 1px solid var(--closedEventBtn) !important;
        color: var(--closedEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
    }

    .closedEventBtn{
        border: 1px solid var(--closedEventBtn) !important;
        color: var(--closedEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
    }
    
`;

const Event = () => {

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const searchByKey = '';

    const [EventData, setEventData] = useState([]);

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        getAllEvents();
    }, [token]);

    const getAllEvents = async () => {
        try {
            setloaderState(true);
            var response = await getAllEventDataApi(searchByKey, pageNo, pageSize);
            console.log(response, 'holiday')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setEventData(response?.data?.events)
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
            console.log('Error Facing during Get All Event API - ', error)
        }
    }

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };



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
                        <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">Event</li>
                    </ol>
                </nav>
                <p className='font14 ps-0 fw-bolder'>Event Details</p>
            </div>
            <div className="row p-3 bg-white borderRadius5 pb-5">
                <table className="table align-middle table-striped">
                    <thead>
                        <tr>
                            <td className='font14'>#</td>
                            <td className='font14'>Event Name</td>
                            <td className='font14'>Start Date & Time</td>
                            <td className='font14'>End Date & Time</td>
                            <td className='font14 text-center'>Status</td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr></tr>
                        {EventData.map((item, index) => (
                            <tr key={item.holidayId}>
                                <td className='font14 greyText'>{index + 1}</td>
                                <td className='font14 greyText'>{item.eventName}</td>
                                <td className='font14 greyText'>{item.startDate} {item.startTime}</td>
                                <td className='font14 greyText'>{item.endDate} {item.endTime}</td>
                                <td className='font14 greyText text-center'><button className={`btn ${item.status === "Upcoming" ? 'upcomingEventBtn' : item.status === "Ongoing" ? 'ongoingEventBtn' : item.status === "Completed" ? 'closedEventBtn' : ''}`} type='button'>{item.status}</button></td>
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

export default Event
