import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';

import { Navbar } from '../components/Navbar';
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesES } from '../../helpers/getMessages';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from '../components/calendarModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';


export const CalendarPage = () => {

    const {events} = useCalendarStore();
    const { openDateModal } = useUiStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log({ event, start, end, isSelected });

        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            color: 'white',
            opacity: 0.8
        }

        return {
            style
        }
    }

    const onDoubleClick = (event) => {
        // console.log({ doubleClick: event });
        openDateModal();
    }

    const onSelect = (event) => {
        console.log({ click: event });
    }

    const onViewChange = (event) => {
        // console.log({ viewChange: event });
        localStorage.setItem('lastView', event)
    }

    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                startAccessor="start"
                defaultView={lastView}
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                // style={{ height: 500 }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChange}
            />

            <CalendarModal />
        </>
    )
}
