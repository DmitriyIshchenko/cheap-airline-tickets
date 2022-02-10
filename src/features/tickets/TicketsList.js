import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import SingleTicket from './SingleTicket';
import { fetchTicketsAsync, selectFilteredItems } from './ticketsSlice';

import "../../styles/TicketsList.css"

export default function TicketsList() {

  const dispatch = useDispatch();
  const status = useSelector(state => state.tickets.status);

  useEffect(() => {
    if (status === "idle") dispatch(fetchTicketsAsync())
  })

  const tickets = useSelector(state => selectFilteredItems(state.tickets));
  const [showAmount, setShowAmount] = useState(5);

  let content = '';
  if (status === "loading") {
    content = <Loading />

  } else if (status === "succeeded") {
    content = tickets.slice(0, showAmount).map((ticket, index) => <SingleTicket key={index} ticket={ticket} />);
  }

  const onShowMoreClick = () => {
    if (content.length !== 0) {
      setShowAmount(showAmount + 5);
    }
  }

  return <section>
    {content}
    <button className='show-more-button'
      style={content.length ? { display: "block" } : { display: "none" }}
      onClick={onShowMoreClick}>
      показать еще 5 билетов!
    </button>
  </section>;
}