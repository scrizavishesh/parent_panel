import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { getAllMarksDataApi } from '../Utils/Apis';
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

`;

const Marks = () => {

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const searchByKey = '';

    const [MarksData, setMarksData] = useState([]);

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        getAllMarks();
    }, []);

    const getAllMarks = async () => {
        try {
            setloaderState(true);
            var response = await getAllMarksDataApi();
            console.log(response, 'marks')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setMarksData(response?.data?.marks)
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
            console.log('Error Facing during Get All Marks API - ', error)
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
                        <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">Marks</li>
                    </ol>
                </nav>
                <p className='font14 ps-0 fw-bolder'>Marks Details</p>
            </div>
            <div className="row p-3 bg-white borderRadius5 pb-5">
                <table className="table align-middle table-striped">
                    <thead>
                        <tr>
                            <td className='font14'>#</td>
                            <td className='font14'>Subject</td>
                            <td className='font14'>Marks</td>
                            <td className='font14'>Grade</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                        {MarksData.map((item, index) => (
                            <tr key={item.holidayId}>
                                <td className='font14 greyText'>{index + 1}</td>
                                <td className='font14 greyText'>{item.subjectName}</td>
                                <td className='font14 greyText'>{item.gainMarks}</td>
                                <td className='font14 greyText'>{item.grade}</td>
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

export default Marks