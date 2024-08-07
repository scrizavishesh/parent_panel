import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { getCollectedStudentFeeByIdApi, getStudentProfileDataApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';

const Container = styled.div`

    .table thead tr{
        --bs-table-bg-type: #F2F3F6 !important;
    }
    
    .table tbody tr:last-child {
        background-color: #1f47c0 !important;
    }

    .form-control::placeholder{
        color: var(--greyState);
    }

    .form-control, .form-select{
        color: var(--greyState);
        border-radius: 5px !important;
        border: 1px solid var(--fontControlBorder);
    }

    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
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

    .greenBG{
        background-color: var(--headingBackgroundColor);
    }

    .darkgreentext{
        color: var(--greenTextColor);
    }

    .greyText{
      color: var(--greyTextColor) !important;
    }

    .greenText{
      color: var(--greenTextColor) !important;
    }

    .modal-footer{
        border: none !important;
    }

`;


const OfflinePayment = () => {

    const { id } = useParams();

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    // Variable State
    const [DateofPayment, setDateofPayment] = useState('')
    const [PaymentMode, setPaymentMode] = useState('')
    const [PaymentFrom, setPaymentFrom] = useState('')
    const [Reference, setReference] = useState('')
    const [AmountPaid, setAmountPaid] = useState('')
    const [ProofOfPayment, setProofOfPayment] = useState('')

    const AddNewOfflinePayment = async () => {
        try {
            const formData = new FormData();
            formData.append('date', CurrDate);
            formData.append('paidAmount', PaidAmount);
            formData.append('discountCode', DiscountCode);
            formData.append('fineAmount', FineAmount);
            formData.append('paymentMode', PaymentMode);
            formData.append('note', Note);

            var response = await AddNewOfflinePaymentAPi(AddFeeId, formData);
            console.log(response);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message)
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                }
            }

        }
        catch {

        }
    }

    return (

        <Container>
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="container-fluid pt-4 ">
                <div className="row gap-xl-0 gap-3">
                    <div className="col-xxl-5 col-xl-4 col-lg-12 col-sm-12 flex-frow-1 ">
                        <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                            <ol className="breadcrumb mb-1">
                                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Fee Collection </a></li>
                                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Fees</li>
                            </ol>
                        </nav>
                        <p className='font14 ps-0 fontWeight500'>Fees List</p>
                    </div>
                    <div className="col-xxl-7 col-xl-8 col-lg-12 col-sm-12">
                        <div className="row gap-sm-0 gap-3">

                            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12 text-end">
                                <div className="row">
                                    <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                                        <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit">
                                            <span className='font14 textVerticalCenter'>
                                                <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                                <span className='ms-1'>Export to CSV</span>
                                            </span>
                                        </Link>
                                    </div>
                                    <div className="col-lg-6 col-sm-6 col-4 text-md-center text-sm-end text-start p-0 align-self-center">
                                        <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" to='/superAdminAddSchools'>
                                            <span className='font14 textVerticalCenter'>
                                                <Icon icon="fluent:document-pdf-24-filled" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                                <span className='ms-1'>Export to PDF</span>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12 text-end align-self-center">
                                <div className="row gap-md-0 gap-sm-3">
                                    <form className="d-flex" role="search">
                                        <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                                        <button className="btn searchButtons text-white " type="button"><span className='font14'>Search</span></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-4">
                <div className="row bg-white cardradius2 p-3">
                    <p className='greenText font14 p-0'>Offline Bank Payments</p>
                    <hr className='mt-2 mb-2' />
                    <form className="row g-3">
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Date Of Payment *</label>
                            <input type="text" className={`form-control font14`} id="validationDefault01" placeholder="dd / mm / yyyyy" onChange={(e) => setDateofPayment(e.target.value)} />
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Payment Mode *</label>
                            <select className={`form-select font14`} aria-label="Default select example" onChange={(e) => handleGenderChange(e.target.value)}>
                                <option defaultValue>Select Discount Group</option>
                                <option value='Offline'>Offline</option>
                                <option value='Online'>Online</option>
                            </select>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Payment From *</label>
                            <input type="text" className={`form-control font14`} id="validationDefault01" placeholder="Enter Address" onChange={(e) => handleAddressChange(e.target.value)} />
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Reference *</label>
                            <input type="text" className={`form-control font14`} id="validationDefault01" placeholder="Enter Phone Number" onChange={(e) => handlePhoneChange(e.target.value)} />
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Amount Paid ($) *</label>
                            <select className={`form-select font14`} aria-label="Default select example" onChange={(e) => handleGenderChange(e.target.value)}>
                                <option defaultValue>Select Discount Group</option>
                                <option value='Offline'>Offline</option>
                                <option value='Online'>Online</option>
                            </select>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Proof Of Payment *</label>
                            <input type="file" className={`form-control font14 `} onChange={(e) => { handleImageChange(e.target.files), console.log(e.target.files) }} />
                        </div>
                    </form>
                    <div className="row p-5">
                        <div className="col-md-6 col-sm-6 col-6 text-end">
                            <button className='btn saveButtons font16 text-white' onClick={AddNewOfflinePayment}>Save</button>
                        </div>
                        <div className="col-md-6 col-sm-6 col-6 text-start">
                            <button className='btn cancelButtons font16' to='/Fees'>Cancel</button>
                        </div>
                    </div>
                </div>
                <Toaster />
            </div>
        </Container>
    )
}

export default OfflinePayment