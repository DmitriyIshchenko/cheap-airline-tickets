import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTicketsAsync, sortByPrice, sortByTime } from './ticketsSlice';
import { Ticket } from './Ticket';
import moment from 'moment';

export function TicketList() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.tickets.status);
    const tickets = useSelector((state) => state.tickets.tickets);
    useEffect(() => {
        if (status === "idle") dispatch(fetchTicketsAsync())
    });


    const getDuration = (unixTime) => {
        const hours = Math.floor(unixTime / 60);
        const minutes = unixTime % 60;
        return `${hours}ч ${minutes}м`
    };

    const getStartEnd = (startDate, duration) => {
        const start = new Date(startDate).getTime();
        const end = start + duration * 3600;
        return `${moment(start).format("hh:mm")} - ${moment(end).format("hh:mm")}`
    };

    const getStopsTitle = (stops) => {
        if (stops.length===0) {
            return "БЕЗ ПЕРЕСАДОК"
        } else if (stops.length === 1) {
            return "1 ПЕРЕСАДКА"
        } else return stops.length + " ПЕРЕСАДКИ"
    }

    return (
        <div>
            <div>
                <div onClick={()=>dispatch(sortByPrice())}>САМЫЙ ДЕШЕВЫЙ</div>
                <div onClick={()=>dispatch(sortByTime())}>САМЫЙ БЫСТРЫЙ</div>
            </div>

            {tickets.slice(0, 5).map(ticket => {
                return <Ticket
                    data={ticket}
                    getDuration={getDuration}
                    getStartEnd={getStartEnd}
                    getStopsTitle={getStopsTitle} />
            })}
        </div>)
}

