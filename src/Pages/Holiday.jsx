import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { getAllHolidayDataApi } from '../Utils/Apis';
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

    /* .hoverIcon{
        position: relative;
        cursor: pointer;

        &:hover .hoveringDescriptionDiv{
            display: block;
            cursor: pointer;
            position: absolute;
            background-color: var(--hoveringDivBg) !important;
            border: 1px solid var(--hoveringDivBorder);
            color: #fff;
            width: 260px;
            z-index: 1;
        }
    }

    .hoveringDescriptionDiv{
        display: none;
    } */
/* 
    .custom-tooltip {
        --bs-tooltip-bg: var(--bd-violet-bg);
        --bs-tooltip-color: var(--bs-white);
    } */

`;

const Holiday = () => {

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const searchByKey = '';

    const [holidayData, setHolidayData] = useState([]);

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // const description = 'Lorem Ipsum is simply dummy text of the printing printing printing printing printing printing sedrfghbjnk sedrfghjn sedrftgyhujk esdrftgvhbjnk sedrtfyghu.';

    useEffect(() => {
        getAllHolidays();
        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl));
        return () => {
            tooltipList.forEach(tooltip => tooltip.dispose());
        };
    }, []);

    const getAllHolidays = async () => {
        try {
            setloaderState(true);
            var response = await getAllHolidayDataApi(searchByKey, pageNo, pageSize);
            console.log(response, 'holiday')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setHolidayData(response?.data?.holidays)
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
            console.log('Error Facing during Get All Holiday API - ', error)
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
                        <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">Holiday</li>
                    </ol>
                </nav>
                <p className='font14 ps-0 fw-bolder'>Holiday Details</p>
            </div>
            <div className="row p-3 bg-white borderRadius5 pb-5">
                <table className="table align-middle table-striped">
                    <thead>
                        <tr>
                            <td className='font14'>#</td>
                            <td className='font14'>Holiday Name</td>
                            <td className='font14'>Date</td>
                            <td className='font14'>Description</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                        {holidayData.map((item, index) => (
                            <tr key={item.holidayId}>
                                <td className='font14 greyText'>{index+1}</td>
                                <td className='font14 greyText'>{item.holidayTitle}</td>
                                <td className='font14 greyText'>{item.holidayDate}</td>
                                <td className='font14 greyText'>
                                    <span className='me-2'> {item.description.substring(0, 60) + "..."} </span>
                                    <button className='btn p-0' type='button' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title={item.description}>
                                        <Icon className='' icon="ph:info-fill" width="1.5em" height="1.5em" style={{ color: '#C1C1C1' }} />
                                    </button>
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

export default Holiday


{/* <td className='font14 greyText d-flex'>
                                <span className='me-2'><span className='me-2'> {description.substring(0, 60) + "..."} </span></span>
                                <div className="hoverIcon">
                                    <Icon className='' icon="ph:info-fill" width="1.5em" height="1.5em" style={{ color: '#C1C1C1' }} />
                                    <span className='p-2 hoveringDescriptionDiv font12'>
                                        {description}
                                    </span>
                                </div>
                            </td> */}