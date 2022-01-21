import React from 'react';
import "../../styles/SingleTicket.css"

const getFlightSchedule = (date, duration) => {
    const timestamp = Date.parse(date);
    /*08:41:00 GMT+0300 (Moscow Standard Time) -> 
    08:41:00 -> 
    08:41*/
    let start = new Date(timestamp).toTimeString();
    start = start.split(" ")[0].split(":").slice(0, 2).join(":");
    let end = new Date(timestamp + duration * 60000).toTimeString();
    end = end.split(" ")[0].split(":").slice(0, 2).join(":");
    return `${start} - ${end}`
}

export default function SingleTicket({ ticket }) {

    const { price, carrier, segments } = ticket;

    const headContent =
        <div className='ticket-head'>
            <p className='ticket-price'>{price} P</p>
            <img className='ticket-carrier-logo' src={`http://pics.avs.io/99/36/${carrier}.png`} alt="carrier logo" />
        </div>

    const segmentsContent = segments.map((segment, index) => {
        const { origin, destination, date, duration, stops } = segment;
        const hours = Math.trunc(duration / 60);
        const minutes = duration - hours * 60;
        return <div className='ticket-segment' key={index}>
            <div>
                <p className='segment-subtitle'>{`${origin} - ${destination}`}</p>
                <p className='segment-info'>{getFlightSchedule(date, duration)}</p>
            </div>
            <div>
                <p className='segment-subtitle'>В ПУТИ</p>
                <p className='segment-info'>{`${hours}ч ${minutes}м`}</p>
            </div>
            <div>
                <p className='segment-subtitle'>{!stops.length ? "БЕЗ ПЕРЕСАДОК" :
                    stops.length === 1 ?
                        "1 ПЕРЕСАДКА" : `${segment.stops.length} ПЕРЕСАДКИ`}</p>
                <p className='segment-info'>{stops.join(", ")}</p>
            </div>
        </div>
    })

    return <article className='ticket'>
        {headContent}
        {segmentsContent}
    </article>;
}
