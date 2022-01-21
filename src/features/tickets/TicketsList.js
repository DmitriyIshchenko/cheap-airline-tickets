import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import SingleTicket from './SingleTicket';
import { fetchTickets } from './ticketsSlice';

import "../../styles/TicketsList.css"

export default function TicketsList() {

    const dispatch = useDispatch();

    const status = useSelector(state => state.tickets.status)
    const tickets = useSelector(state => state.tickets.filteredItems)

    const [showAmount, setShowAmount] = useState(5);

    let content = '';
    let showMoreSlyle = {
        display: "none"
    };
    if (status === "loading") {
        content = <Loading />

    } else if (status === "succeeded") {
        content = tickets.slice(0, showAmount).map((ticket, index) => <SingleTicket key={index} ticket={ticket} />);
        showMoreSlyle = { display: "inline-block" }
    }
    const onShowMoreClick = () => {
        if (content.length !== 0) {
            setShowAmount(showAmount + 5);
        }
    }
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchTickets());
        }
    }, [status, dispatch])

    return <section>
        {content}
        <button className='show-more-button' style={showMoreSlyle} onClick={onShowMoreClick} >показать еще 5 билетов!</button>
    </section>;
}
