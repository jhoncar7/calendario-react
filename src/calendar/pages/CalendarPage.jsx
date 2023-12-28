import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';

import { Navbar } from '../components/Navbar';
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesES } from '../../helpers/getMessages';
import { CalendarEvent } from '../components/CalendarEvent';
import { useEffect, useState } from 'react';
import { CalendarModal } from '../components/calendarModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FavAddNew } from '../components/FavAddNew';
import { FavDelete } from '../components/FavDelete';
import { useAuthStore } from '../../hooks/useAuthStore';


export const CalendarPage = () => {

    const { user } = useAuthStore();
    const { events, setActiveEvent, hasEventSelected, startLoadingEvents } = useCalendarStore();
    const { openDateModal } = useUiStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log({ event, start, end, isSelected });

        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
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
        setActiveEvent(event)
    }

    const onViewChange = (event) => {
        // console.log({ viewChange: event });
        localStorage.setItem('lastView', event)
    }

    useEffect(() => {
        startLoadingEvents();
    }, [])


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

            <FavAddNew />
            {
                hasEventSelected && <FavDelete />
            }

        </>
    )
}
