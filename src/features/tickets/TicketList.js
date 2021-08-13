import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTicketsAsync, sortByPrice, sortByTime } from './ticketsSlice';
import { Ticket } from './Ticket';
import moment from 'moment';

export function TicketList() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.tickets.status);
    const tickets = useSelector((state) => state.tickets.tickets);
    let filtersObj = useSelector((state) => state.filters.filters);
    filtersObj = Object.keys(filtersObj).filter(item => filtersObj[item]).map(item => +item);
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
        if (stops.length === 0) {
            return "БЕЗ ПЕРЕСАДОК"
        } else if (stops.length === 1) {
            return "1 ПЕРЕСАДКА"
        } else return stops.length + " ПЕРЕСАДКИ"
    }

    return (
        <div id="list-container">
            <div id="sort-container">
                <div className="sort-div">
                    <input
                        className="sort-input"
                        type="radio"
                        name="sort"
                        id="sort-by-price"
                        value="price"
                        onChange={() => dispatch(sortByPrice())} />
                    <label for="sort-by-price" className="sort-label" id="price-label">САМЫЙ ДЕШЕВЫЙ</label>
                </div>
                <div className="sort-div">
                    <input
                        className="sort-input"
                        type="radio"
                        name="sort"
                        id="sort-by-time"
                        value="time"
                        onChange={() => dispatch(sortByTime())} />
                    <label for="sort-by-time" className="sort-label" id="time-label">САМЫЙ БЫСТРЫЙ</label>
                </div>


            </div>
            {
                tickets.filter(item => filtersObj.includes(item.segments[0].stops.length) 
                && filtersObj.includes(item.segments[1].stops.length))
                    .slice(0, 5).map(ticket => {
                        return <Ticket
                            data={ticket}
                            getDuration={getDuration}
                            getStartEnd={getStartEnd}
                            getStopsTitle={getStopsTitle} />
                    })
            }
        </div>)
}

