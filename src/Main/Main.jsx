import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/DashboardPage'
import PageNotFound from '../Pages/PageNotFound'
import styled from 'styled-components';
import ProfilePage from '../Pages/ProfilePage';
import Event from '../Pages/Event';
import Holiday from '../Pages/Holiday';
import Notice from '../Pages/Notice';
import SamplePaper from '../Pages/SamplePaper';
import Assignment from '../Pages/Assignment';
import Teacher from '../Pages/Teacher';
import OnlineCourse from '../Pages/OnlineCourse';
import Fees from '../Pages/Fees';
import OfflineExams from '../Pages/OfflineExams';
import Marks from '../Pages/Marks';
import Grades from '../Pages/Grades';
import OfflinePayment from '../Pages/OfflinePayment';

const Container = styled.div`
`;

const Main = () => {
  return (
    <>
      <Container>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/grades' element={<Grades/>}/>
          <Route path='/marks' element={<Marks/>}/>
          <Route path='/offlineExam' element={<OfflineExams/>}/>
          <Route path='/Fees' element={<Fees/>}/>
          <Route path='/offlinePaymentForm/:id' element={<OfflinePayment/>}/>
          <Route path='/OnlineCourse' element={<OnlineCourse/>}/>
          <Route path='/teacher' element={<Teacher/>}/>
          <Route path='/Assignments' element={<Assignment/>}/>
          <Route path='/SamplePaper' element={<SamplePaper/>}/>
          <Route path='/Holiday' element={<Holiday/>}/>
          <Route path='/Notice' element={<Notice/>}/>
          <Route path='/Event' element={<Event/>}/>
          <Route path='/Profile' element={<ProfilePage/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </>
  )
}

export default Main