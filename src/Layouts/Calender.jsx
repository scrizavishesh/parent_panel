import React from 'react';
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import styled from 'styled-components';
import 'rsuite/dist/rsuite-no-reset.min.css';

const Container = styled.div`
  width: 100%;
  .calendar-todo-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 7px;

      a {
        cursor: pointer;
      }
    }
  }

  .rs-badge-independent {
    background-color: #FEBC00; // default holiday color
  }

  .rs-badge-independent.rs-badge-dot {
    border-radius: 7px;
    height: 10px;
    width: 10px;
  }

  .rs-calendar-table-cell-un-same-month .rs-calendar-table-cell-content {
    color: #959595;
  }

  .rs-calendar-table-header-cell-content {
    color: #FF904A;
  }

  .rs-calendar-header{
    display: flex;
    justify-content: center;
  }
  
  /* CSS to hide the calendar header */
  .rs-calendar-btn-today {
    display: none;
  }
`;

const AttendanceBadge = styled.div`
  border-radius: 7px;
  height: 10px;
  width: 10px;
  padding: 2px;
  background-color: ${props => props.color};
`;

const CalendarComponent = ({DailyAttendanceData}) => {

  const data = DailyAttendanceData

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return '#00C9B8'; // green for present
      case 'absent':
        return '#FF0020'; // red for absent
      case 'holiday':
        return '#FEBC00';
      default:
        return '#ffffff'; // yellow for holiday
    }
  };

  const getAttendanceStatus = (date) => {
    for (let person of data) {
      for (let record of person.attendance) {
        if (record.date === date) {
          return record.status;
        }
      }
    }
    return null;
  };

  const renderCell = (date) => {
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
    const currentMonth = new Date().getMonth();

    if (dayOfWeek === 'Sun' || date.getMonth() !== currentMonth) {
      return null;
    }

    const attendanceDate = convert(date); // 2024-09-07
    const attendanceStatus = getAttendanceStatus(attendanceDate);
    const badgeColor = getStatusColor(attendanceStatus);

    if (attendanceStatus) {
      return (
        <ul className="calendar-todo-list">
          <li className="m-2 d-flex justify-content-center">
            <AttendanceBadge color={badgeColor} />
          </li>
        </ul>
      );
    }
    return null;
  };

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  return (
    <Container>
      <Calendar className='p-0' compact bordered renderCell={renderCell} header={null} />
    </Container>
  );
};

export default CalendarComponent;