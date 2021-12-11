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
            console.log(data);
            for(let i = 0; i < data.length; i++){
                let customer = '';
                let activityStart = new Date(data[i].date);
                let activityEnd = new Date(activityStart.getTime() + data[i].duration);
                if(data[i].customer != null) { customer = data[i].customer.firstname + ' ' + data[i].customer.lastname;}
                let title = customer + ' ' + data[i].activity;

                let tempEvent = {title : title, start: activityStart, end: activityEnd, duration: data.duration};
                tempArr[i] = tempEvent;
                console.log(tempEvent);
            }
            setEvents(tempArr);
        })
        .catch(e => console.error(e))
    }

    useEffect(() => {
        fetchTraingings();
    }, [])

    return(
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, bootstrapPlugin]}
            events={events}
            initialView="timeGridWeek"
            height="auto"
            themeSystem="bootstrap"
            headerToolbar={{
                start: "dayGridMonth,timeGridWeek,timeGridDay",
                center: 'prev,today,next',
                end : 'title'
            }}
            
            displayEventTime='true'
            displayEventEnd='true'
            eventColor='red'
        
            eventDisplay='block'
            eventBackgroundColor='navy'
            weekNumbers='true'


        />
    )
}

export default Schedule;