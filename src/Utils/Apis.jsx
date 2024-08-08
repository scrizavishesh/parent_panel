import axios from 'axios'
const token = `Bearer ${localStorage.getItem('token')}`;
const forgetTooken = `Bearer ${localStorage.getItem('forgteToken')}`;
// const token = localStorage.getItem('token');

const LocalGirjeshIP= 'http://10.5.51.4:5000';
// const Domain= 'http://auth.edu2all.in:5000';
const Domain= 'https://www.auth.edu2all.in';

// ******************************************************************************************************
                            // Login  //
// ******************************************************************************************************


export const loginApi = async(data) => {
    var res = await axios.post(`${Domain}/login/all`,data);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const logoutApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/login/logout`);
    if (res) {
        return res;
    }else{
       return [];
    }
}


// ******************************************************************************************************
                            // Forget Password  //
// ******************************************************************************************************


export const getOTPByMailApi = async(mail) => {
    var res = await axios.post(`${Domain}/login/getOtp?email=${mail}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}


export const verifyOTPApi = async(OTP) => {
    axios.defaults.headers.common["Authorization"] = forgetTooken;
    var res = await axios.post(`${Domain}/login/verify-otp?OTP=${OTP}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const setPassApi = async(newpass) => {
    axios.defaults.headers.common["Authorization"] = forgetTooken;
    var res = await axios.post(`${Domain}/login/setPassword?password=${newpass}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

// ******************************************************************************************************
                            // Dashboard  //
// ******************************************************************************************************




export const getDashDataApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/sch/getDashData`);

    if (res) {
        return res;
    }else{
       return [];
    }
}



// ******************************************************************************************************
                            // Holiday  //
// ******************************************************************************************************


export const getAllHolidayDataApi = async(searchKey, pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/holiday/all?&searchKey=${searchKey}&page=${pageNo}&size=${size}`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}

// ******************************************************************************************************
                            // Notice  //
// ******************************************************************************************************


export const getAllNoticeDataApi = async(searchKey, pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/notice/allNotice?&searchKey=${searchKey}&page=${pageNo}&size=${size}`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


export const getNoticeDataByIdApi = async(id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/notice/findNotice/${id}`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                            // Event  //
// ******************************************************************************************************


export const getAllEventDataApi = async(searchKey, pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/events/allEvents?&searchKey=${searchKey}&page=${pageNo}&size=${size}`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                            // Assignments  //
// ******************************************************************************************************


export const getAllAssignmentsDataApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/stu-get-assignment`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                            // SamplePaper  //
// ******************************************************************************************************


export const getAllSamplePaperDataApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/stu-get-samplePaper`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                            // Grade  //
// ******************************************************************************************************


export const getAllGradeDataApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/grades/stu-get-grade`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                            // OfflineExams  //
// ******************************************************************************************************


export const getAllOfflineExamsDataApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/exam_details/stu-exam-details`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                            // Marks  //
// ******************************************************************************************************


export const getAllMarksDataApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/marks/stu-get-marks`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}

// ******************************************************************************************************
                            // Teachers  //
// ******************************************************************************************************


export const getAllTeachersDataApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subject/getByTeaByStd`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}



// ******************************************************************************************************
                            // Subject  //
// ******************************************************************************************************


export const getAllSubjectDataApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subject/getBySubByStd`);
    if (res) {
        return res;
    }else{
        return [];
    }
}



// ******************************************************************************************************
                            // Attendance  //
// ******************************************************************************************************


export const getAllStudentAttendanceApi = async(month, year) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/attendance/getStudentAttendance?&month=${month}&year=${year}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                            // ClassRoutine  //
// ******************************************************************************************************


export const getAllClassRoutineDataApi = async(day) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/routine/getByStudent?day=${day}`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}


// ******************************************************************************************************
                            // Fees  //
// ******************************************************************************************************




export const getCollectedStudentFeeByIdApi = async(studentId, size, page) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getByStudent?size=${size}&page=${page}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}



export const getFeePaidByParentApi = async(id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/payByParents/${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}



// ******************************************************************************************************
                            // Student Profile  //
// ******************************************************************************************************


export const getStudentProfileDataApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/student/studentData`);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const updateStudentProfileDataApi = async(data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/student/updateByStudent`, data);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const AddNewOfflinePaymentAPi = async(data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/student/updateByStudent`, data);
    
    if (res) {
        return res;
    }else{
        return [];
    }
}
