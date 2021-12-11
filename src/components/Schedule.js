import React, {useEffect, useState} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!
import bootstrapPlugin from '@fullcalendar/bootstrap';


function Schedule() {

    const [events, setEvents] = useState([{}])

    const fetchTraingings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(res => res.json())
        .then(data => {
            let tempArr = [{}];
            for(let i = 0; i < data.length; i++){
                let customer = '';
                let activityStart = new Date(data[i].date);
                let activityEnd = new Date(activityStart.getTime() + data[i].duration * 60000);
                if(data[i].customer != null) { customer = data[i].customer.firstname + ' ' + data[i].customer.lastname;}
                let title = data[i].activity + " " + customer;

                let tempEvent = {title : title, start: activityStart, end: activityEnd, duration: data.duration};
                tempArr[i] = tempEvent;
            }
            setEvents(tempArr);
        })
        .catch(e => console.error(e))
    }

    useEffect(() => {
        fetchTraingings();
    }, [])

    return(
        <div style={{background:'#6a8070'}}>
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, bootstrapPlugin]}
            events={events}
            height="auto"
            initialView="timeGridWeek"
            themeSystem="bootstrap"
            headerToolbar={{
                start : 'prev,next today',
                center: 'title',
                end: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            nowIndicator="true"
            allDaySlot="false"

            slotMinTime="07:00:00"
            slotMaxTime="24:00:00"
            
            weekText=''
            displayEventTime='true'
            displayEventEnd='true'
            eventColor='red'
        
            eventDisplay='block'
            eventBackgroundColor='#db8e4f'
            weekNumbers='true'
        />
        </div>
    )
}

export default Schedule;