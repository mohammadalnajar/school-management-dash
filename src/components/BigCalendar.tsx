'use client';

import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import { calendarEvents } from '@/lib/data';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
    const [view, setView] = useState<View>(Views.WORK_WEEK);

    const handleOnChangeView = (selectedView: View) => {
        setView(selectedView);
    };

    const eventStyleGetter = (event: any) => {
        const backgroundColor = event.bgColor || '#3174ad'; // Default color if not provided
        const textColor = event.textColor || 'white'; // Default color if not provided
        const style = {
            backgroundColor,
            color: textColor, // Adjust text color for better contrast
            border: 'none',
            padding:'10px' ,
            margin: '10px',
            width: '99%'
        };
        return { style };
    };

    return (
        <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor='start'
            endAccessor='end'
            views={['work_week', 'day']}
            view={view}
            style={{ height: '98%' }}
            onView={handleOnChangeView}
            min={new Date(2025, 1, 0, 8, 0, 0)}
            max={new Date(2025, 1, 0, 17, 0, 0)}
            eventPropGetter={eventStyleGetter}
        />
    );
};

export default BigCalendar;
